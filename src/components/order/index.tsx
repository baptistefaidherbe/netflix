import React, { useState } from 'react';
import styles from './order.module.scss';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from '@mui/material';
import { useCart } from '@/context/cartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { loadStripe } from '@stripe/stripe-js';
import { useCheckout } from '@/hooks/useCheckout';
import Error from '@/components/error';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

const Order = () => {
  const cartContext = useCart();
  const [error, setError] = useState('');;
  const { mutate, isLoading } = useCheckout();

  if (!cartContext) return null;

  const { cart, dispatch } = cartContext;

  const deleteItem = (index: number) => {
    dispatch({ type: 'REMOVE', index });
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      setError('Stripe initialization failed.');
      return;
    }

    mutate(cart, {
      onSuccess: (session) => {
        stripe.redirectToCheckout({ sessionId: session.data.id });
      },
      onError: (error: any) => {
        setError(error.response?.data || 'An error occurred during checkout.');
      },
    });
  };

  const totalPrice = cart
    .reduce((total, item) => total + item.Price, 0)
    .toFixed(2);

  return (
    <div className={styles.order}>
      {error && <Error message={error} />}
      <h1>Récapitulatif de mon panier</h1>
      <div className={styles.order_wrapper}>
        <div className={styles.order_wrapperCard}>
          {cart.length === 0 ? (
            <p>Votre panier est vide</p>
          ) : (
            cart.map((item, index) => (
              <Card className={styles.card} key={index}>
                <CardActionArea>
                  <DeleteIcon onClick={() => deleteItem(index)} />
                  <CardMedia
                    component='img'
                    height='140'
                    image={item.Images[0]}
                    alt={item.Title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {item.Title}
                    </Typography>
                    <Typography gutterBottom variant='h5' component='div'>
                      {item.Price} €
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          )}
        </div>
        <Card className={styles.total}>
          <span>Total</span>
          <p style={{ fontSize: '25px' }}>{totalPrice}€</p>
          <button onClick={handleCheckout} disabled={cart.length === 0}>
            {isLoading ? 'Processing...' : 'Valider ma commande'}
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Order;
