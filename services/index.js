import rickServiceName from './rickServiceName';
import rickServiceID from './rickServiceId';
import axios from 'axios';
import { getCharacterList } from './getCharacterList';

const client = axios.create({ baseURL: 'https://rickandmortyapi.com/api/' });

export const serviceName = rickServiceName(client);
export const serviceList = getCharacterList(client);
export const serviceID = rickServiceID(client);
