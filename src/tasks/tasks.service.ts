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
    entity.name = dto.name;
    entity.slug = dto.externalOfferId;
    entity.description = dto.description;
    entity.requirements = dto.requirements;
    entity.thumbnail = dto.thumbnail;
    entity.isDesktop = dto.isDesktop ? 1 : 0;
    entity.isAndroid = dto.isAndroid ? 1 : 0;
    entity.isIos = dto.isIos ? 1 : 0;
    entity.offerUrlTemplate = dto.offerUrlTemplate;
    entity.providerName = dto.providerName;
    entity.externalOfferId = dto.externalOfferId;
    entity.id = null as unknown as number; //https://github.com/typeorm/typeorm/issues/7643#issuecomment-1081398542
    return entity;
  }

  makeRequest(provider: Provider) {
    this.httpService.get(provider.url).subscribe(async ({ data }) => {
      const payloadDto = plainToClass(provider.payloadDto, data);
      const valErrors = await validate(payloadDto);
      if (valErrors.length > 0) {
        this.logger.warn(`Invalid payload form provider ${provider.name}`);
        return;
      }
      for (const offer of provider.getOffers(data)) {
        const formattedOffer = plainToClass(provider.dto, offer, {
          excludeExtraneousValues: true,
        });
        const entity = this.createEntityFromDto(formattedOffer);
        this.offerRepository.upsert(entity, ['externalOfferId']);
      }
    });
  }
}
