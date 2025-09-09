import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TIngredient,
  TOrder,
  TOrdersData,
  TUser,
  TConstructorIngredient
} from '../utils/types';
import { nanoid } from 'nanoid';

interface ConstructState {
  orderIngredients: TConstructorIngredient[];
}

const initialState: ConstructState = {
  orderIngredients: []
};

export const constructSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addToOrder: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.orderIngredients = state.orderIngredients.filter(
          (c) => c.type != 'bun'
        );
        state.orderIngredients.unshift({
          ...action.payload,
          id: nanoid()
        });
        return;
      }
      state.orderIngredients.push({
        ...action.payload,
        id: nanoid()
      });
    },
    removeFromOrder: (state, action: PayloadAction<string>) => {
      state.orderIngredients = state.orderIngredients.filter((c) => c.id != action.payload);
    },
    clearOrder: (state) => {
      state.orderIngredients = [];
    },
    moveIngredientUp: (state, action: PayloadAction<string>) => {
  const id = action.payload;
  const index = state.orderIngredients.findIndex(item => item.id === id);

  if (index > 0) {
    const ingredients = [...state.orderIngredients];
    [ingredients[index - 1], ingredients[index]] = [
      ingredients[index],
      ingredients[index - 1]
    ];
    state.orderIngredients = ingredients;
  }
},
    moveIngredientDown: (state, action: PayloadAction<string>) => {
  const id = action.payload;
  const index = state.orderIngredients.findIndex(item => item.id === id);

  if (index >= 0 && index < state.orderIngredients.length - 1) {
    const ingredients = [...state.orderIngredients];
    [ingredients[index], ingredients[index + 1]] = [
      ingredients[index + 1],
      ingredients[index]
    ];
    state.orderIngredients = ingredients;
  }
}
  }
});

export const {
    addToOrder,
      removeFromOrder,
        clearOrder,
          moveIngredientUp,
            moveIngredientDown
            } = constructSlice.actions;


export default constructSlice.reducer;
