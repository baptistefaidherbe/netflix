'use client';

import VideoPlayer from '@/components/video-player';
import { useFetchMovie } from '@/hooks/useFetchMovie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Watch({
  params,
  searchParams,
}: {
  searchParams: { isVideoAccessible: boolean };
  params: { slug: string };
}) {
  const { slug } = params;
  const { data, isFetching } = useFetchMovie(slug);
  const { isVideoAccessible } = searchParams;
  const router = useRouter();

  useEffect(() => {
    if (!isVideoAccessible) {
      router.push('/login');
    }
  }, [router, isVideoAccessible]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <VideoPlayer src={`/video/${data[0].Video}`} />
    </div>
  );
}
