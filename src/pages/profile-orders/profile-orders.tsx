import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { fetchOrders } from '../../services/slices/orders/actions';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
