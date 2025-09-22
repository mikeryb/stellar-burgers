import { expect, test } from '@jest/globals';
import { 
  TConstructorIngredient
} from '../utils/types';
import { addToOrder, removeFromOrder, clearOrder, moveIngredientUp, moveIngredientDown, constructSlice, initialState } from './constructSlice';

const mockIngredients: TConstructorIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    id: 'cNBd3_WOmk-oLCu0CPmFB'
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    id: 'IQhF3gyolSufK549Jldto'
  },
  {
    _id: '643d69a5c3f7b9001cfa0940',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    id: 'gvHZZM6S3mAy6mIxMTjjB'
  },
  {
    _id: '643d69a5c3f7b9001cfa0947',
    name: 'Плоды Фалленианского дерева',
    type: 'main',
    proteins: 20,
    fat: 5,
    carbohydrates: 55,
    calories: 77,
    price: 874,
    image: 'https://code.s3.yandex.net/react/code/sp_1.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
    id: 'QwHRo2SkoX5mcS11gmlA0'
  }
];


test('добавление ингредиента-небулки в конец массива', () => {
    const state = { ...initialState };
    const action = addToOrder(mockIngredients[1]); 
    const newState = constructSlice.reducer(state, action);
    expect(newState.orderIngredients).toHaveLength(1);
    expect(newState.orderIngredients[0]).toEqual(mockIngredients[1]);
});

test('добавление булки в начало массива', () => {
    let state = { ...initialState, orderIngredients: [mockIngredients[1]] };
    const action = addToOrder(mockIngredients[0]);
    const newState = constructSlice.reducer(state, action);
    expect(newState.orderIngredients).toHaveLength(2);
    expect(newState.orderIngredients[0]).toEqual(mockIngredients[0]);
    expect(newState.orderIngredients[1]).toEqual(mockIngredients[1]);
});

test('замена булки из массива на новую при добавлении', () => {
  let state = { ...initialState, orderIngredients: [mockIngredients[0], mockIngredients[1]] };
    const newBun = { ...mockIngredients[0], id: 'bun2', name: 'Булка 2' };
    const action = addToOrder(newBun);
    const newState = constructSlice.reducer(state, action);
    expect(newState.orderIngredients).toHaveLength(2);
    expect(newState.orderIngredients[0]).toEqual(newBun);
    expect(newState.orderIngredients[1]).toEqual(mockIngredients[1]);
});

test('удаление ингредиента из массива', () => {
  let state = { ...initialState, orderIngredients: mockIngredients };
  const action = removeFromOrder(mockIngredients[1].id);
  const newState = constructSlice.reducer(state, action);
  expect(newState.orderIngredients).toHaveLength(mockIngredients.length - 1);  
  expect(newState.orderIngredients.find(i => i.id === mockIngredients[1].id)).toBeUndefined();
  expect(newState.orderIngredients[1]).toEqual(mockIngredients[2]);
});

test('очищение массива конструктора', () => {
  let state = { ...initialState, orderIngredients: mockIngredients };
  const action = clearOrder();
  const newState = constructSlice.reducer(state, action);
  expect(newState.orderIngredients.length).toEqual(0);
});

test('поднимаем ингредиент на 1 позицию', () => {
  const state = { ...initialState, orderIngredients: mockIngredients };
    const action = moveIngredientUp(mockIngredients[2].id);
    const nextState = constructSlice.reducer(state, action);
    expect(nextState.orderIngredients[1]).toEqual(mockIngredients[2]);
    expect(nextState.orderIngredients[2]).toEqual(mockIngredients[1]);
});

test('опускаем ингредиент на 1 позицию', () => {
  const state = { ...initialState, orderIngredients: mockIngredients };
    const action = moveIngredientDown(mockIngredients[1].id);
    const nextState = constructSlice.reducer(state, action);
    expect(nextState.orderIngredients[1]).toEqual(mockIngredients[2]);
    expect(nextState.orderIngredients[2]).toEqual(mockIngredients[1]);
});



