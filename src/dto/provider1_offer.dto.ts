import { Expose, Transform } from '@nestjs/class-transformer';
import OfferDto from './offer.dto';

// I had to expose each and every field because of https://github.com/typestack/class-transformer/issues/740
export class Provider1OfferDto implements OfferDto {
  @Transform(({ obj }) => obj.offer_name)
  @Expose()
  name: string;

  // unique identifier for offer
  // TODO
  @Transform(({ obj }) => obj.offer_id)
  @Expose()
  slug: string;

  // offer description
  @Transform(({ obj }) => obj.offer_desc)
  @Expose()
  description: string;

  // offer requirements
  @Transform(({ obj }) => obj.call_to_action)
  @Expose()
  requirements: string;

  // offer thumbnail image url
  @Transform(({ obj }) => obj.image_url)
  @Expose()
  thumbnail: string;

  // indicates if offer is available for desktop
  @Transform(({ obj }) => (obj.platform === 'desktop' ? 1 : 0))
  @Expose()
  isDesktop: number;

  // indicates if offer is available for android
  @Transform(({ obj }) => {
    const devices = obj.device.split('_');
    const index = devices.findIndex(
      (device: string) => device !== 'iphone' && device !== 'ipad',
    );
    return index !== -1 ? 1 : 0;
  })
  @Expose()
  isAndroid: number;

  // indicates if offer is available for ios
  @Transform(({ obj }) => {
    const devices = obj.device.split('_');
    return devices.includes('iphone') ? 1 : 0;
  })
  @Expose()
  isIos: number;

  // offer url template
  @Transform(({ obj }) => obj.offer_url)
  @Expose()
  offerUrlTemplate: string;

  // provider name - this should be static for each offer type
  // we're attaching two offer payloads - offer1, offer2
  // so for offer1 payload, this should be "offer1"
  // for offer2 payload, this should be "offer2"
  providerName = 'offer1';

  // offer id from external provider
  @Transform(({ obj }) => obj.offer_id)
  @Expose()
  externalOfferId: string;
}
