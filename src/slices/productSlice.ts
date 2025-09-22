import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';
import { getIngredientsApi } from '../utils/burger-api';
import { RootState } from 'src/store';

export const fetchIngredients = createAsyncThunk(
  'ingredients',
  async () => getIngredientsApi()
);

interface ProductState {
  ingredients: TIngredient[];
  isLoading: boolean;
  isLoaded: boolean  
};

export const initialState: ProductState = {
  ingredients: [],
  isLoading: false,
  isLoaded: false
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
      
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
        state.isLoaded = true
      });
  }
});
/*  */
export const selectIngredients = (state: RootState) =>
  state.products.ingredients;

export const selectIsLoading = (state: RootState) =>
  state.products.isLoading;

export const selectIsLoaded = (state: RootState) =>
  state.products.isLoaded;
export default productSlice.reducer;

