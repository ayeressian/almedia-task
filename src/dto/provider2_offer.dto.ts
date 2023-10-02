import { Expose, Transform } from '@nestjs/class-transformer';
import OfferDto from './offer.dto';

// I had to expose each and every field because of https://github.com/typestack/class-transformer/issues/740
export class Provider2OfferDto implements OfferDto {
  @Transform(({ obj: { Offer: offer } }) => offer.name)
  @Expose()
  name: string;

  // unique identifier for offer
  // TODO
  @Transform(({ obj: { Offer: offer } }) => offer.campaign_id)
  @Expose()
  slug: string;

  // offer description
  @Transform(({ obj: { Offer: offer } }) => offer.description)
  @Expose()
  description: string;

  // offer requirements
  @Transform(({ obj: { Offer: offer } }) => offer.instructions)
  @Expose()
  requirements: string;

  // offer thumbnail image url
  @Transform(({ obj: { Offer: offer } }) => offer.icon)
  @Expose()
  thumbnail: string;

  // indicates if offer is available for desktop
  @Transform(({ obj: { OS: os } }) => os.web)
  @Expose()
  isDesktop: boolean = true;

  // indicates if offer is available for android
  @Transform(({ obj: { OS: os } }) => os.android)
  @Expose()
  isAndroid: boolean;

  // indicates if offer is available for ios
  @Transform(({ obj: { OS: os } }) => os.ios)
  @Expose()
  isIos: boolean;

  // offer url template
  @Transform(({ obj: { Offer: offer } }) => offer.tracking_url)
  @Expose()
  offerUrlTemplate: string;

  // provider name - this should be static for each offer type
  // we're attaching two offer payloads - offer1, offer2
  // so for offer1 payload, this should be "offer1"
  // for offer2 payload, this should be "offer2"
  providerName = 'offer2';

  // offer id from external provider
  @Transform(({ obj: { Offer: offer } }) => offer.campaign_id)
  @Expose()
  externalOfferId: string;
}
