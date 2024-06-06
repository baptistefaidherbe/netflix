import Link from 'next/link';
import styles from './homeVideo.module.scss';
import useIsVideoAccessible from '@/hooks/useIsVideoAccessible';

const VideoComponent = ({
  session,
  show,
  addToCart,
}: {
  show: CartItem;
  session: string;
  addToCart: (item: any) => void;
}) => {
  const isVideoAccessible = useIsVideoAccessible(session, show);
  return (
    <div className={styles.videoContainer}>
      <video autoPlay muted loop>
        <source src='/video/A Lovely Night Scene _ La La Land.mp4' />
      </video>

      <div className={styles.videoContainer_wrapper}>
        <h1>{show.Title}</h1>
        <p>{show.Plot}</p>
        <div className={styles.videoContainer_wrapper_btn}>
          {isVideoAccessible ? (
            <Link href={{ pathname: `/watch/${show.Id}`, query: { isVideoAccessible } }}>
              <button className={styles.moreInfoButton}>Lecture</button>
            </Link>
          ) : (
            <button
              className={styles.moreInfoButton}
              onClick={() => addToCart(show)}
            >
              Ajouter au panier
            </button>
          )}
          <button className={styles.moreInfoButton}>Plus d&apos;infos</button>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
