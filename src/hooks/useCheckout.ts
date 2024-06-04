import { useMutation } from 'react-query';
import axios from 'axios';

export function useCheckout() {
  return useMutation((cart: CartItem[]) => axios.post('/api/checkout', cart));
}
