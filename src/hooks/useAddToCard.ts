import { useCart } from '@/context/cartContext';

export const useAddToCart = () => {
    const cartContext = useCart();
  
    if (!cartContext) {
      throw new Error('useCart must be used within a CartProvider');
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
  
    return addToCart;
  };