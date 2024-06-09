'use client';

import HeaderOnline from '@/components/header-online';
import styles from './home.module.scss';
import { useState } from 'react';
import { useFetchShows } from '@/hooks/useFetchShow';
import Carousel from '@/components/ui/carousel';
import Modal from '@/components/ui/modal';
import VideoComponent from '@/components/homeVideo';
import { filteredData } from '@/utils';
import { motion } from 'framer-motion';
import { useAddToCart } from '@/hooks/useAddToCard';
import { useRequireAuth } from '@/hooks/useRequiredAuth';

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [hoveredCategory, setHoveredCategory] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const { data, isFetching } = useFetchShows();
  const {session, status} = useRequireAuth();

  const addToCart = useAddToCart();

  if (status === 'loading' && isFetching) {
    return <div>Loading...</div>;
  }

  const CATEGORY = [
    'Action',
    'Adventure',
    'Drama',
    'Crime',
    'Sci-Fi',
    'Fantasy',
    'Drama',
  ];

  const itemFilter =
    hoveredCategory !== ''
      ? filteredData(data || [], hoveredCategory, hoveredIndex)
      : data
      ? data[0]
      : null;

  return (
    status === 'authenticated' && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <main className={styles.home}>
          <HeaderOnline />
          {data && data.length > 0 && (
            <>
              <VideoComponent
                setHoveredCategory={setHoveredCategory}
                setShowModal={setShowModal}
                addToCart={addToCart}
                session={session?.user?.email ?? ''}
                show={data[0]}
              />
              <div className={styles.wrapper}>
                {CATEGORY.map((cat, index) => (
                  <div key={index} className={styles.home_carousel}>
                    <h3>Catégorie {cat}</h3>
                    <Carousel
                      data={data}
                      category={cat}
                      setHoveredIndex={setHoveredIndex}
                      setShowModal={setShowModal}
                      setHoveredCategory={setHoveredCategory}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
          {itemFilter && (
            <Modal
              session={session?.user?.email ?? ''}
              addToCart={addToCart}
              itemFilter={itemFilter}
              show={showModal}
              onClose={() => setShowModal(false)}
            ></Modal>
          )}
        </main>
      </motion.div>
    )
  );
}
