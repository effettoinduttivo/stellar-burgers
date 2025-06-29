import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector, getOrders } from '@services';

export const ProfileOrders: FC = () => {
  const { orders, isOrdersLoaded } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isOrdersLoaded) {
      dispatch(getOrders());
    }
  }, [isOrdersLoaded, dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
