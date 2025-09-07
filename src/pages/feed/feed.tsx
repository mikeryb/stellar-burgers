import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../store';
import { selectIsLoading,selectOrders, fetchFeeds} from '../../slices/orderSlice';


export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders: TOrder[] = useSelector<RootState, TOrder[]>(selectOrders);
  const isLoading: boolean = useSelector<RootState, boolean>(selectIsLoading);
  useEffect(() => {
        dispatch(fetchFeeds());
      },[]);
  if (isLoading) {
    return <Preloader />;    
  }   
  return   <FeedUI orders={orders} handleGetFeeds={() => {dispatch(fetchFeeds())}} />;
};
