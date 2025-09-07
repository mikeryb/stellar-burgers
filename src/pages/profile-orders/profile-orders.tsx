import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { RootState, AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrdersThunk } from '../../slices/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector((store: RootState) => store.orders.myOrders);
  useEffect(() => {
    dispatch(getMyOrdersThunk());
  },[])

  return <ProfileOrdersUI orders={orders} />;
};
