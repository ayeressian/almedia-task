import ProviderPayloadDto from '../dto/provider_payload.dto';
import OfferDto from '../dto/offer.dto';

export default interface Provider {
  name: string;
  url: string;
  getOffers: (data: unknown) => unknown[];
  dto: {
    new (): OfferDto;
  };
  payloadDto: {
    new (): ProviderPayloadDto;
  };
}
