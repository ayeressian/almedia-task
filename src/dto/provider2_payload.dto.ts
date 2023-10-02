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
import ProviderPayloadDto from './provider_payload.dto';
import { Type } from '@nestjs/class-transformer';
import IsNestedElements from './nested_element';

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

class Provider2DataDto {
  @ValidateNested()
  @Type(() => Provider2OfferDto)
  Offer: Provider2OfferDto;

  @ValidateNested()
  @Type(() => Provider2OsDto)
  OS: Provider2OsDto;
}

export class Provider2PayloadDto implements ProviderPayloadDto {
  @IsIn(['success'])
  status: string;

  @IsNotEmpty()
  @IsNestedElements(Provider2DataDto)
  @IsObject()
  data: {
    [key: string]: Provider2DataDto;
  };
}
