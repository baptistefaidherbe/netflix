import Link from 'next/link';
import styles from './homeVideo.module.scss';
import { motion } from 'framer-motion';

const VideoComponent = ({ show }: { show: CartItem }) => {
  return (
 
      <div className={styles.videoContainer}>
        <video autoPlay muted loop>
          <source src='/video/A Lovely Night Scene _ La La Land.mp4' />
        </video>

        <div className={styles.videoContainer_wrapper}>
          <h1>{show.Title}</h1>
          <p>{show.Plot}</p>
          <div className={styles.videoContainer_wrapper_btn}>
            <Link href={`/watch/${show.Id}`}>
              <button className={styles.moreInfoButton}>Lecture</button>
            </Link>
            <button className={styles.moreInfoButton}>Plus d&apos;infos</button>
          </div>
        </div>
      </div>
  
  );
};

export default VideoComponent;
