import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsUrl,
} from 'class-validator';
import ProviderPayloadDto from './provider_payload.dto';
import { Type } from '@nestjs/class-transformer';

class Provider1OfferDto {
  @IsString()
  @IsNotEmpty()
  offer_id: string;

  @IsString()
  @IsNotEmpty()
  offer_name: string;

  @IsString()
  @IsNotEmpty()
  offer_desc: string;

  @IsString()
  @IsNotEmpty()
  call_to_action: string;

  @IsUrl()
  offer_url: string;

  @IsUrl()
  image_url: string;

  @IsString()
  @IsNotEmpty()
  platform: string;

  @IsString()
  @IsNotEmpty()
  device: string;
}

class Provider1ResponseDto {
  @IsArray()
  @ValidateNested()
  @Type(() => Provider1OfferDto)
  offers: Provider1OfferDto[];
}

export class Provider1PayloadDto implements ProviderPayloadDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Provider1ResponseDto)
  response: Provider1ResponseDto;
}
