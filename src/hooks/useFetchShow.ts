import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';

const fetchShows = async () => {
  const { data } = await axios.get(`/api/shows/`);
  return data;
};

export function useFetchShows(): UseQueryResult<CartItem[], unknown> {
  return useQuery<CartItem[], unknown>('fetchShows', fetchShows);
}
