import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient, TOrder, TOrdersData, TUser } from '../utils/types';
import { getFeedsApi, orderBurgerApi, getOrdersApi } from '@api';


interface OrderState {
  feeds: { orders: TOrder[]; total: number; totalToday: number };
  feedIsLoading: boolean;
  orderIngredients: TIngredient[];
  orderIsPosting: boolean;
  order: TOrder | null;
  myOrders: TOrder[];
  myOrderIsLoading: boolean;
}

const initialState: OrderState = {
  feeds: { orders: [], total: 0, totalToday: 0 },
  feedIsLoading: false,
  orderIngredients: [],
  orderIsPosting: false,
  order: null,
  myOrders: [],
  myOrderIsLoading: false
};

export const fetchFeeds = createAsyncThunk('feeds', async () => getFeedsApi());

export const postOrder = createAsyncThunk(
  'order/post',
  async (ingredients: TIngredient[]) => {
    try {
      const ingredientIds = ingredients.map((c) => c._id);
      const response = await orderBurgerApi(ingredientIds);
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export const refreshOrders = createAsyncThunk('orders/refreshAll', async (user: TUser | null) => {
  try {
    const [feedsData, ordersData] = await Promise.all([
      getFeedsApi(),
      user ? getOrdersApi() : Promise.resolve([])
    ]);

    return { feedsData, ordersData };
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const getMyOrdersThunk = createAsyncThunk('orders/get', async () => {
  try {
    return await getOrdersApi();
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addToOrder: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.orderIngredients = state.orderIngredients.filter(
          (c) => c.type != 'bun'
        );
        state.orderIngredients.push(action.payload);
        return;
      }
      state.orderIngredients.push(action.payload);
    },
    removeFromOrder: (state, action: PayloadAction<string>) => {
      const index = state.orderIngredients.findIndex(
        (item) => item._id === action.payload
      );
      if (index !== -1) {
        state.orderIngredients.splice(index, 1);
      }
    },
    clearOrder: (state) => {
      state.order = null;
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const ingredients = [...state.orderIngredients];
        [ingredients[index - 1], ingredients[index]] = [
          ingredients[index],
          ingredients[index - 1]
        ];
        state.orderIngredients = ingredients;
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.orderIngredients.length - 1) {
        const ingredients = [...state.orderIngredients];
        [ingredients[index], ingredients[index + 1]] = [
          ingredients[index + 1],
          ingredients[index]
        ];
        state.orderIngredients = ingredients;
      }
    }
  },
  extraReducers: (builder) => {
    builder;
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.feedIsLoading = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feedIsLoading = false;
        state.feeds = action.payload;
      })
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
        state.orderIngredients = [];
      })
      .addCase(getMyOrdersThunk.pending, (state) => {
        state.myOrderIsLoading = true;
      })
      .addCase(getMyOrdersThunk.rejected, (state, action) => {
        state.myOrderIsLoading = false;
        console.log(action.error);
      })
      .addCase(getMyOrdersThunk.fulfilled, (state, action) => {
        state.myOrderIsLoading = false;
        state.myOrders = action.payload;
      })
      .addCase(refreshOrders.fulfilled, (state, action) => {
        state.feeds = action.payload.feedsData;
        state.myOrders = action.payload.ordersData;
      })
      .addCase(refreshOrders.rejected, (action) => {
      })
      .addCase(refreshOrders.pending, (action) => {
      });
  }
});

export const selectFeeds = (state: { orders: OrderState }) =>
  state.orders.feeds;

export const selectIsLoading = (state: { orders: OrderState }) =>
  state.orders.feedIsLoading;

export const selectOrders = (state: { orders: OrderState }) =>
  state.orders.feeds.orders;

export const selectMyOrders = (state: { orders: OrderState }) =>
  state.orders.myOrders;

export const {
  addToOrder,
  removeFromOrder,
  clearOrder,
  moveIngredientUp,
  moveIngredientDown
} = orderSlice.actions;

export default orderSlice.reducer;
