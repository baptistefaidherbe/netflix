import Link from 'next/link';
import styles from './video-player.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import { Player } from 'video-react';

const VideoPlayer = ({ src }: { src: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.video}>
        <Link href='/'>
          <ArrowBackIcon className={styles.arrow} />
        </Link>
        <video controls autoPlay>
          <source src={src} />
        </video>
      </div>
    </motion.div>
  );
};

export default VideoPlayer;
