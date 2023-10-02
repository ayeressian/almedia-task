import { Provider1PayloadDto } from '../dto/provider1_payload.dto';
import { Provider1OfferDto } from '../dto/provider1_offer.dto';
import Provider from './provider';

export default class Provider1 implements Provider {
  name = 'provider1';
  url = 'https://run.mocky.io/v3/385f2afd-369a-4ccf-959f-51e60458ba5a';
  getOffers = (data: { response: { offers: [] } }) => data.response.offers;
  dto = Provider1OfferDto;
  payloadDto = Provider1PayloadDto;
}
