import { Provider2PayloadDto } from '../dto/provider2_payload.dto';
import { Provider2OfferDto } from '../dto/provider2_offer.dto';
import Provider from './provider';

export default class Provider2 implements Provider {
  name = 'provider2';
  url = 'https://run.mocky.io/v3/445928af-35ea-45f7-a81e-578d746a2d18';
  getOffers = (data: { data: Record<string, unknown> }) =>
    Object.values(data.data);
  dto = Provider2OfferDto;
  payloadDto = Provider2PayloadDto;
}
