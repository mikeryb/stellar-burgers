import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../store';
import { addToOrder } from '../../slices/orderSlice';


export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    const handleAdd = () => {
      dispatch(addToOrder(ingredient))
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
