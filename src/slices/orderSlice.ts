import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient, TOrder, TOrdersData, TUser } from '../utils/types';
import { getFeedsApi, orderBurgerApi, getOrdersApi } from '@api';

interface OrderState {
  orderIsPosting: boolean;
  order: TOrder | null;
}

const initialState: OrderState = {
  orderIsPosting: false,
  order: null
};

export const postOrder = createAsyncThunk(
  'order/post',
  async (ingredients: TIngredient[]) => {
    try {
      const bun = ingredients.find((item) => item.type === 'bun')!;
      const ingredientIds = [...ingredients, bun].map((c) => c._id);
      const response = await orderBurgerApi(ingredientIds);
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderData: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.orderIsPosting = true;
      })
      .addCase(postOrder.rejected, (state) => {
        state.orderIsPosting = false;
        console.log('что то пошло не так');
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orderIsPosting = false;
        state.order = action.payload.order;
      });
  }
});
export const { clearOrderData } = orderSlice.actions;
export default orderSlice.reducer;
