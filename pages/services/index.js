import rickServiceName from './rickServiceName';
import getCharacterList from './getCharacterList';
import rickServiceID from './rickServiceId';
import axios from 'axios';

const client = axios.create({ baseURL: 'https://rickandmortyapi.com/api/' });

export const serviceName = rickServiceName(client);
export const serviceList = getCharacterList(client);
export const serviceID = rickServiceID(client);