import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {RootState, AppDispatch} from '../../store';
import { useDispatch, useSelector} from 'react-redux';
import { removeFromOrder, moveIngredientDown, moveIngredientUp } from '../../slices/orderSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleMoveDown = () => {dispatch(moveIngredientDown(index))};

    const handleMoveUp = () => {dispatch(moveIngredientUp(index))};

    const handleClose = () => {dispatch(removeFromOrder(ingredient._id))};

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
