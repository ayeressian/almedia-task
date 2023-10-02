import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import OfferEntity from '../entities/offer.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([OfferEntity])],
  providers: [TasksService],
})
export class TasksModule {}
