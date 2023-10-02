import { Module } from '@nestjs/common';

import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import OfferEntity from './entities/offer.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [OfferEntity],
      synchronize: true,
    }),
    TasksModule,
  ],
})
export class AppModule {}
