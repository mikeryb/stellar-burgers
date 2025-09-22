import { expect, test } from '@jest/globals';
import { TOrder } from '../utils/types';
import reducer, { postOrder, clearOrderData, initialState } from './orderSlice';


const mockOrder: TOrder = {
        _id: '68cd6864673086001ba88d63',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093e'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный био-марсианский бургер',
        createdAt: '2025-09-19T14:27:48.952Z',
        updatedAt: '2025-09-19T14:27:50.146Z',
        number: 89019
      };

test ('postOrder.pending - устанавливаем orderIsPosting = true', () => {
  const action = { type: postOrder.pending.type };
  const state = reducer(initialState, action);
  expect(state.orderIsPosting).toBe(true);
});

test ('postOrder.fullfilled - устанавливаеи orderIsPosting = false, обновляем state.order', () => {
  const action = { type:postOrder.fulfilled.type, payload: {order: mockOrder}};
  const state = reducer({...initialState, orderIsPosting: true}, action);
  expect(state.order).toEqual(mockOrder);
  expect(state.orderIsPosting).toBe(false);
});

test ('postOrder.rejected - сбрасываем orderIsPosting = false, выводим ошибку в консоль', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  const action = { type:postOrder.rejected.type };
  const state = reducer({...initialState, orderIsPosting: true}, action);
  expect(state.orderIsPosting).toBe(false);  
});

test ('clearOrderData - очищаем state.order = null', () => {
  const action = clearOrderData();
  const state = reducer({...initialState, order: mockOrder}, action);
  expect (state.order).toBe(null);
})

  
