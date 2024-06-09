'use client';

import axios from 'axios';
import { useEffect } from 'react';
import styles from './success.module.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HeaderOnline from '@/components/header-online';
import Link from 'next/link';
import { useCart } from '@/context/cartContext';
import { useRequireAuth } from '@/hooks/useRequiredAuth';

export default function Success() {
  const { session } = useRequireAuth();
  const { dispatch } = useCart() || {};

  useEffect(() => {
    const fetchCartAndProcess = async () => {
      if (!session?.user?.email || !dispatch) return;

      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        const videoIds = parsedCart.map((item: CartItem) => item.Id);

        try {
          await axios.post('/api/purchase', {
            videoIds,
            userId: session.user.email,
          });
          localStorage.removeItem('cart');
          dispatch({ type: 'RESTORE_CART', cart: [] });
        } catch (error) {
          console.error('Error updating shows:', error);
        }
      }
    };

    fetchCartAndProcess();
  }, [session, dispatch]);

  return (
    <div className={styles.success}>
      <HeaderOnline />
      <div className={styles.success_wrapper}>
        <CheckCircleIcon className={styles.success_wrapper_icon} />
        <h1>Success</h1>
        <span>Votre achat a bien été effectué !</span>
        <Link href='/'>
          <button>Continuer</button>
        </Link>
      </div>
    </div>
  );
}
