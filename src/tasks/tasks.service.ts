import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { plainToClass } from '@nestjs/class-transformer';
import { CronJob } from 'cron';
import OfferDto from '../dto/offer.dto';
import OfferEntity from '../entities/offer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Provider from './provider';
import Provider1 from './provider1';
import Provider2 from './provider2';
import { SchedulerRegistry } from '@nestjs/schedule';
import { validate } from 'class-validator';

@Injectable()
export class TasksService {
  // For simplicity sake lets keep info in a variable
  private static readonly providers: Provider[] = [
    new Provider1(),
    new Provider2(),
  ];
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly httpService: HttpService,
    private schedulerRegistry: SchedulerRegistry,
    @InjectRepository(OfferEntity)
    private offerRepository: Repository<OfferEntity>,
  ) {
    for (const provider of TasksService.providers) {
      this.addCronJob(provider);
    }
  }

  addCronJob(provider: Provider) {
    // this.makeRequest(provider);
    const job = new CronJob(`1 * * * * *`, () => {
      this.makeRequest(provider);
    });

    this.schedulerRegistry.addCronJob(provider.name, job);
    job.start();
  }

  createEntityFromDto(dto: OfferDto) {
    const entity = new OfferEntity();
    Object.assign(entity, dto);
    entity.id = null as unknown as number; //https://github.com/typeorm/typeorm/issues/7643#issuecomment-1081398542
    return entity;
  }

  makeRequest(provider: Provider) {
    this.httpService.get(provider.url).subscribe(async ({ data }) => {
      const payloadDto = plainToClass(provider.payloadDto, data);
      const valErrors = await validate(payloadDto);
      if (valErrors.length > 0) {
        this.logger.error(`Invalid payload form provider ${provider.name}`);
        return;
      }
      for (const offer of provider.getOffers(data)) {
        const payloadOfferDto = plainToClass(provider.payloadOfferDto, offer);
        const valErrors = await validate(payloadOfferDto);
        if (valErrors.length > 0) {
          this.logger.warn(`Invalid offer form provider ${provider.name}`);
          continue;
        }
        const formattedOffer = plainToClass(provider.dto, offer, {
          excludeExtraneousValues: true,
        });
        const entity = this.createEntityFromDto(formattedOffer);
        this.offerRepository.upsert(entity, ['externalOfferId']);
      }
    });
  }
}
