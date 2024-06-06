'use client';

import axios from 'axios';
import { useEffect } from 'react';
import styles from './success.module.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HeaderOnline from '@/components/header-online';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useCart } from '@/context/cartContext';

export default function Success() {
  const { data: session } = useSession();
  const cartContext = useCart();

  const { dispatch } = cartContext || {};

  useEffect(() => {
    if (!session?.user?.email) {
      return;
    }

    const updateShow = async (videoIds: string[], userId: string) => {
      try {
        await axios.post('/api/purchase', { videoIds, userId });
      } catch (error) {
        console.error('Error updating shows:', error);
      } finally {
        localStorage.removeItem('cart');
        if (dispatch) {
          dispatch({ type: 'RESTORE_CART', cart: [] });
        }
      }
    };

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      const videoIds = parsedCart.map((item: CartItem) => item.Id);
      updateShow(videoIds, session.user.email);
    }
  }, [session, dispatch, cartContext]);

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
