import {
  IsIn,
  ValidateNested,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsString,
  IsUrl,
  IsObject,
} from 'class-validator';
import PayloadDto from './payload.dto';
import { Type } from '@nestjs/class-transformer';
import PayloadOfferDto from './payload_offer.dto';

class Provider2OfferDto {
  @IsNumber()
  campaign_id: number;

  @IsUrl()
  icon: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  tracking_url: string;

  @IsString()
  @IsNotEmpty()
  instructions: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

class Provider2OsDto {
  @IsBoolean()
  android: boolean;

  @IsBoolean()
  ios: boolean;

  @IsBoolean()
  web: boolean;
}

export class Provider2DataDto implements PayloadOfferDto {
  @ValidateNested()
  @Type(() => Provider2OfferDto)
  Offer: Provider2OfferDto;

  @ValidateNested()
  @Type(() => Provider2OsDto)
  OS: Provider2OsDto;
}

export class Provider2PayloadDto implements PayloadDto {
  @IsIn(['success'])
  status: string;

  @IsObject()
  data: Record<string, Provider2DataDto>;
}
