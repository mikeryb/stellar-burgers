import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useAppDispatch, useAppSelector } from '../../store';
import { removeFromOrder, moveIngredientDown, moveIngredientUp } from '../../slices/constructSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();

    const handleMoveDown = () => {dispatch(moveIngredientDown(ingredient.id))};

    const handleMoveUp = () => {dispatch(moveIngredientUp(ingredient.id))};

    const handleClose = () => {dispatch(removeFromOrder(ingredient.id))};
    

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
