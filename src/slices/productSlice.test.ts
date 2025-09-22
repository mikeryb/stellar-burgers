import { expect, test } from '@jest/globals';
import reducer, { fetchIngredients, initialState } from './productSlice';
import { TIngredient } from '../utils/types';

const mockIngredients: TIngredient[] = [
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
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
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
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
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
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
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
    image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
  }
];

test('fetchIngredients.pending - установка isLoading = true', () => {
  const action = { type: fetchIngredients.pending.type };
  const state = reducer(initialState, action);
  expect(state.isLoading).toBe(true);
});

test('fetchIngredients.rejected - сброс isLoading = false', () => {
  const action = { type: fetchIngredients.rejected.type };
  const state = reducer(initialState, action);
  expect(state.isLoading).toBe(false);
});

test('fetchIngredients.fullfilled - сброс isLoading = false, установка isLoaded = true и обновляет стор ингредиентов', () => {
  const action = {
    type: fetchIngredients.fulfilled.type,
    payload: mockIngredients
  };
  const state = reducer(
    { ...initialState, isLoading: true, isLoaded: false },
    action
  );
  expect(state.isLoading).toBe(false);
  expect(state.isLoaded).toBe(true);
  expect(state.ingredients).toEqual(mockIngredients);
});
