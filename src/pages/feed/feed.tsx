import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import {RootState, AppDispatch} from '../../store';
import { selectIsLoading,selectOrders, fetchFeeds, toggleFeedIsLoading} from '../../slices/feedsSlice';


export const Feed: FC = () => {
  const REFRESH_INTERVAL = 5000;
  const dispatch = useAppDispatch();
  const orders: TOrder[] = useAppSelector(selectOrders);
  const isLoading: boolean = useAppSelector(selectIsLoading);
  useEffect(() => {
        dispatch(fetchFeeds());
        const interval = setInterval(() => {
          dispatch(fetchFeeds())
        }, REFRESH_INTERVAL);
        return () => clearInterval(interval);
      },[]);
  if (isLoading) {
    return <Preloader />;    
  }   
  return   <FeedUI orders={orders} handleGetFeeds={() => {dispatch(toggleFeedIsLoading());dispatch(fetchFeeds())}} />;
};
