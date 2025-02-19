import { radio } from '../config';
import type { Station } from '../types';

export const fetchStations = async (
  query?: string,
  limit: number = 10,
  offset: number = 0
) => {
  const response = await radio.get<Array<Station>>(`/stations/search`, {
    params: {
      name: query,
      limit,
      offset,
    },
  });
  return response.data;
};
