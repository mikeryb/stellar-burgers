import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useAppDispatch, useAppSelector } from '../../store';
import {RootState, AppDispatch} from '../../store';
import { addToOrder } from '../../slices/constructSlice';
import { nanoid } from 'nanoid';


export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const handleAdd = () => {
      dispatch(addToOrder({...ingredient, id: nanoid()}))
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
