import { configureStore } from '@reduxjs/toolkit';
import  productSliceReducer  from './slices/productSlice';
import orderSliceReducer from './slices/orderSlice';
import  userSliceReducer  from './slices/userSlice';
import feedsSliceReducer from './slices/feedsSlice';
import constructSliceReducer from './slices/constructSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
    reducer: {
        products: productSliceReducer,
        orders: orderSliceReducer,
        user: userSliceReducer,
        feeds: feedsSliceReducer,
        construct: constructSliceReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
