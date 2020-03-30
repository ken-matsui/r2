import BrokerAdapterImpl from './BrokerAdapterImpl';
import { IBrokerConfigType } from '../types';

export function create(config: IBrokerConfigType) {
  return new BrokerAdapterImpl(config);
}
