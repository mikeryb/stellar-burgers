import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient, TOrder, TOrdersData, TUser } from '../utils/types';
import { getIngredientsApi } from '@api';

export const fetchIngredients = createAsyncThunk('ingredients', async () => {
  return getIngredientsApi();
});

interface ProductState {
  ingredients: TIngredient[] | undefined,
  isLoading: boolean
}

const initialState: ProductState = {
  ingredients: undefined,
  isLoading: false,
}

const productSlice({
  name: 'products',
  initialState,

})
