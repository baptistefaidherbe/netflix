import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';

const initialState: CartItem[] = [];

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'RESTORE_CART'; cart: CartItem[] }
  | { type: 'REMOVE'; index: number };

type CartContextType = {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
} | null;
const CartContext = createContext<CartContextType>(null);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, dispatch] = useReducer(
    (state: CartItem[], action: CartAction) => {
      switch (action.type) {
        case 'ADD_ITEM':
          const updatedCart = [...state, action.item];
          localStorage.setItem('cart', JSON.stringify(updatedCart));
          return updatedCart;
        case 'RESTORE_CART':
          return action.cart;
        case 'REMOVE':
          const data = state.filter((_, index) => index !== action.index);
          localStorage.setItem('cart', JSON.stringify(data));
          return data;
        default:
          return state;
      }
    },
    initialState
  );

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart: CartItem[] = JSON.parse(storedCart);
      dispatch({ type: 'RESTORE_CART', cart: parsedCart });
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
