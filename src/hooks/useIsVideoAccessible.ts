import { useState, useEffect } from 'react';
import { useFetchPurchase } from './useFetchPurchase';
import { isAccessValid } from '@/utils';

const useIsVideoAccessible = (
  session: string,
  itemFilter: CartItem
): boolean => {
  const [isVideoAccessible, setIsVideoAccessible] = useState(false);
  const { data } = useFetchPurchase(session);

  useEffect(() => {
    if (data && data.purchases.length > 0) {
      data.purchases.filter(
        (purchase: { videoId: string; purchaseTime: Date }) => {
          purchase.videoId === itemFilter.Id.toString() &&
            isAccessValid(purchase.purchaseTime) &&
            setIsVideoAccessible(true);
        }
      );
    }

    return () => {
      setIsVideoAccessible(false);
    };
  }, [data, itemFilter.Id]);

  return isVideoAccessible;
};

export default useIsVideoAccessible;
