import { useQuery } from 'react-query';
import axios from 'axios';

const getMovieBySlug = async (slug: string) => {
  const { data } = await axios.get(`/api/movie/${slug}`);
  return data;
};

export function useFetchMovie(slug: string) {
  return useQuery({
    queryKey: ['movie', slug],
    queryFn: () => getMovieBySlug(slug),
    enabled: !!slug,
  });
}
