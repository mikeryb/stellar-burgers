import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../store';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { postOrder, clearOrder } from '../../slices/orderSlice';

export const BurgerConstructor: FC = () => {

  
const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

   const { user } = useSelector((store: RootState) => store.user);
   const { order: orderModalData, orderIsPosting: orderRequest, orderIngredients } = useSelector((store: RootState) => store.orders)
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const order = useSelector((state: RootState) => state.orders.orderIngredients);
      const ingredients = order
      .filter((c) => c.type !== 'bun')
      .map((c) => ({ ...c, id: nanoid() }));
  const bun = order.find((c) => c.type === 'bun') || null;


  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login'); 
      return
    };
    dispatch(postOrder(orderIngredients));
  };
  const closeOrderModal = () => {
        dispatch(clearOrder());
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
