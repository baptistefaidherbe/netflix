import { useQuery } from 'react-query';
import axios from 'axios';

const fetchPurchase = async (userId: string) => {
  const { data } = await axios.get('/api/purchase', {
    params: { userId },
  });
  return data;
};

export function useFetchPurchase(userId: string) {
  return useQuery('fetchPurchase', () => fetchPurchase(userId));
}
