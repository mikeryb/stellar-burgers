import { expect, test } from '@jest/globals';
import reducer, {
  fetchFeeds,
  getMyOrdersThunk,
  toggleFeedIsLoading,
  initialState
} from './feedsSlice';
import { TOrder } from '../utils/types';


const mockOrders: TOrder[] = [
  {
    _id: '68cb3567673086001ba88ae1',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный метеоритный бургер',
    createdAt: '2025-09-17T22:25:43.113Z',
    updatedAt: '2025-09-17T22:25:44.409Z',
    number: 88978
  },
  {
    _id: '68cb3488673086001ba88adf',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa0946',
      '643d69a5c3f7b9001cfa0948',
      '643d69a5c3f7b9001cfa094a',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa094a',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный антарианский астероидный бессмертный минеральный альфа-сахаридный люминесцентный бургер',
    createdAt: '2025-09-17T22:22:00.793Z',
    updatedAt: '2025-09-17T22:22:02.129Z',
    number: 88977
  },
  {
    _id: '68cb2f51673086001ba88ad6',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный био-марсианский бургер',
    createdAt: '2025-09-17T21:59:45.692Z',
    updatedAt: '2025-09-17T21:59:46.888Z',
    number: 88976
  }
];

const mockFeedsData = {
  orders: mockOrders,
  total: 250,
  totalToday: 15
};

test('toggleFeedIsLoading — устанавливает feedIsLoading = true', () => {
  const action = toggleFeedIsLoading();
  const state = reducer(initialState, action);
  expect(state.feedIsLoading).toBe(true);
});

test('fetchFeeds.pending — если нет заказов, feedIsLoading = true', () => {
  const action = { type: fetchFeeds.pending.type };
  const state = reducer(initialState, action);
  expect(state.feedIsLoading).toBe(true);
});

test('fetchFeeds.fulfilled — обновляет данные заказов и сбрасывает feedIsLoading', () => {
  const action = {
    type: fetchFeeds.fulfilled.type,
    payload: mockFeedsData
  };
  const state = reducer({ ...initialState, feedIsLoading: true }, action);
  expect(state.feedIsLoading).toBe(false);
  expect(state.feeds).toEqual(mockFeedsData);
});

test('getMyOrdersThunk.pending — если myOrders пуст, myOrderIsLoading = true', () => {
  const action = { type: getMyOrdersThunk.pending.type };
  const state = reducer(initialState, action);
  expect(state.myOrderIsLoading).toBe(true);
});

test('getMyOrdersThunk.fulfilled — обновляет список моих заказов и сбрасывает myOrderIsLoading', () => {
  const action = {
    type: getMyOrdersThunk.fulfilled.type,
    payload: mockOrders
  };
  const state = reducer({ ...initialState, myOrderIsLoading: true }, action);
  expect(state.myOrderIsLoading).toBe(false);
  expect(state.myOrders).toEqual(mockOrders);
});

test('getMyOrdersThunk.rejected — сбрасывает myOrderIsLoading в false и выводит ошибку в консоль', () => {
   const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const action = {
      type: getMyOrdersThunk.rejected.type,
      error: { message: 'Ошибка загрузки' },
    };
    const state = reducer(
      { ...initialState, myOrderIsLoading: true },
      action
    );
    expect(state.myOrderIsLoading).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(expect.objectContaining({
    message: 'Ошибка загрузки',
  }));
  });
