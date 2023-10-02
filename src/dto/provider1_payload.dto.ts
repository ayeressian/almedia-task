import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsUrl,
} from 'class-validator';
import PayloadDto from './payload.dto';
import { Type } from '@nestjs/class-transformer';
import PayloadOfferDts from './payload_offer.dto';

export class Provider1PayloadOfferDto implements PayloadOfferDts {
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
  offers: Provider1PayloadOfferDto[];
}

export class Provider1PayloadDto implements PayloadDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Provider1ResponseDto)
  response: Provider1ResponseDto;
}
