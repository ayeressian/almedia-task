import PayloadDto from '../dto/payload.dto';
import OfferDto from '../dto/offer.dto';
import PayloadOfferDto from '../dto/payload_offer.dto';

export default interface Provider {
  name: string;
  url: string;
  getOffers: (data: unknown) => unknown[];
  dto: {
    new (): OfferDto;
  };
  payloadDto: {
    new (): PayloadDto;
  };
  payloadOfferDto: {
    new (): PayloadOfferDto;
  };
}
