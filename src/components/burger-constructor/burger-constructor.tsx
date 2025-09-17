import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../store';
import { RootState, AppDispatch } from '../../store';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { postOrder, clearOrderData } from '../../slices/orderSlice';
import { clearOrder } from '../../slices/constructSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((store: RootState) => store.user);
  const { order: orderModalData, orderIsPosting: orderRequest } = useAppSelector(
    (store: RootState) => store.orders
  );
  const order = useAppSelector(
    (state: RootState) => state.construct.orderIngredients
  );
  const ingredients = order.filter((c) => c.type !== 'bun');
  const bun = order.find((c) => c.type === 'bun') || null;

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(postOrder(order));
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearOrderData());

  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  /* return null; */

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
