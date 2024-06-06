'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import HeaderOnline from '@/components/header-online';
import styles from './home.module.scss';
import { useEffect, useState } from 'react';
import { useFetchShows } from '@/hooks/useFetchShow';
import Carousel from '@/components/ui/carousel';
import Modal from '@/components/ui/modal';
import VideoComponent from '@/components/homeVideo';
import { useCart } from '@/context/cartContext';
import { filteredData } from '@/utils';
import { motion } from 'framer-motion';

export default function Home() {
  const { data: session, status } = useSession();
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [hoveredCategory, setHoveredCategory] = useState<string>('');
  const router = useRouter();
  const { data, isFetching } = useFetchShows();
  const [showModal, setShowModal] = useState(false);

  const cartContext = useCart();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (!cartContext) {
    return null;
  }

  const { cart, dispatch } = cartContext;

  const addToCart = (product: any) => {
  
    const isAlreadyInCart = cart.some(
      (item: { Title: string }) => item.Title === product.Title
    );

    if (!isAlreadyInCart) {
      dispatch({ type: 'ADD_ITEM', item: product });
    }
  };

  if (status === 'loading' && isFetching) {
    return <div>Loading...</div>;
  }

  const category = [
    'Action',
    'Adventure',
    'Drama',
    'Crime',
    'Sci-Fi',
    'Fantasy',
    'Drama',
  ];

  const itemFilter = hoveredCategory
    ? filteredData(data || [], hoveredCategory, hoveredIndex)
    : null;

  if (status === 'authenticated') {
    return (
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
              <VideoComponent addToCart={addToCart} session={session?.user?.email ?? ''} show={data[0]} />
              <div className={styles.wrapper}>
                {category.map((cat, index) => (
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
    );
  }
}
