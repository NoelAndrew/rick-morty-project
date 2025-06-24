import { schema } from 'normalizr';

export const character = new schema.Entity('characters');

export const characterList = [character];
