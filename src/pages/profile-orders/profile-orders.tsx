import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { RootState, AppDispatch } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store';
import { getMyOrdersThunk } from '../../slices/feedsSlice';

export const ProfileOrders: FC = () => {
   const REFRESH_INTERVAL = 5000;
  const dispatch = useAppDispatch();
  const orders: TOrder[] = useAppSelector((store: RootState) => store.feeds.myOrders);
  useEffect(() => {
    dispatch(getMyOrdersThunk());
    const interval = setInterval(() => {
              dispatch(getMyOrdersThunk())
            }, REFRESH_INTERVAL);
            return () => clearInterval(interval);
  },[])

  return <ProfileOrdersUI orders={orders} />;
};
