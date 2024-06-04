import { useMutation } from 'react-query';
import axios from 'axios';

export function useSignUp() {
  return useMutation((data: FormValues) => axios.post('/api/signup', data));
}
