import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector, getOrders } from '@services';

export const ProfileOrders: FC = () => {
  const { orders } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(getOrders());
    }
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
