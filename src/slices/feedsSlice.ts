import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '@api';
import { TIngredient, TOrder, TOrdersData, TUser } from '../utils/types';

interface FeedsState {
  feeds: { orders: TOrder[]; total: number; totalToday: number };
  feedIsLoading: boolean;
  myOrders: TOrder[];
  myOrderIsLoading: boolean;
};

const initialState: FeedsState = {
  feeds: { orders: [], total: 0, totalToday: 0 },
  feedIsLoading: false,
  myOrders: [],
  myOrderIsLoading: false
}

export const fetchFeeds = createAsyncThunk('feeds', async () => getFeedsApi());

export const getMyOrdersThunk = createAsyncThunk('orders/get', async () => {
  try {
    return await getOrdersApi();
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {toggleFeedIsLoading: (state) => {
    state.feedIsLoading = true;
  }},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        if (!state.feeds.orders.length){          
        state.feedIsLoading = true;};
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feedIsLoading = false;
        state.feeds = action.payload;
      })
      .addCase(getMyOrdersThunk.pending, (state) => {
        if (!state.myOrders.length){
        state.myOrderIsLoading = true;}
      })
      .addCase(getMyOrdersThunk.rejected, (state, action) => {
        state.myOrderIsLoading = false;
        console.log(action.error);
      })
      .addCase(getMyOrdersThunk.fulfilled, (state, action) => {
        state.myOrderIsLoading = false;
        state.myOrders = action.payload;
      })
  }
});

export const selectFeeds = (state: { feeds: FeedsState}) =>
  state.feeds.feeds;

export const selectIsLoading = (state: { feeds: FeedsState }) =>
  state.feeds.feedIsLoading;

export const selectOrders = (state: { feeds: FeedsState }) =>
  state.feeds.feeds.orders;

export const selectMyOrders = (state: { feeds: FeedsState }) =>
  state.feeds.myOrders;

export const {
toggleFeedIsLoading
} = feedsSlice.actions;

export default feedsSlice.reducer;
