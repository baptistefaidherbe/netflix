'use client';

import VideoPlayer from '@/components/video-player';
import { useFetchMovie } from '@/hooks/useFetchMovie';

export default function Watch({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data, isFetching } = useFetchMovie(slug);


  if (isFetching) {
    return <div>Loading...</div>;
  }

console.log(data)
  return (
    <div>
      <VideoPlayer src={`/video/${data[0].Video}`} />
    </div>
  );
}
