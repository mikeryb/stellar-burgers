import { configureStore } from '@reduxjs/toolkit';
import  productSliceReducer  from './slices/productSlice';
import orderSliceReducer from './slices/orderSlice';
import  userSliceReducer  from './slices/userSlice';

export const store = configureStore({
    reducer: {
        products: productSliceReducer,
        orders: orderSliceReducer,
        user: userSliceReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
