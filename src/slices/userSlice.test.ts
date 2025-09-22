import { expect, test } from '@jest/globals';
import reducer, {
  registerUserThunk,
  loginUserThunk,
  checkUserAuth,
  editUserThunk,
  logoutThunk,
  init,
  initialState
} from './userSlice';
import { TUser } from '../utils/types';

const mockUser: TUser = {
  email: 'sharik@mail.ru',
  name: 'sharik'
};

test ('registerUserThunk.pending - устанавливает isLoading = true', () => {
  const action = { type: registerUserThunk.pending.type };
  const state = reducer(initialState, action);
  expect(state.isLoading).toBe(true);
})

test ('registerUserThunk.fullfilled - сбрасывает isLoading = false, устанавливаем isInit = true, обновляем данные user', () => {
  const action = {type: registerUserThunk.fulfilled.type, payload: {user: mockUser}};
  const state = reducer({...initialState, isInit: false, isLoading: true}, action);
  expect(state.user).toEqual(mockUser);
  expect(state.isInit).toBe(false);
  expect(state.isLoading).toBe(false);
});

test ('registerUserThunk.rejected - сбрасываем isLoading = false, устанавливаем в state.error message ошибки', () => {
  const action = { type: registerUserThunk.rejected.type, error: { message: "ошибка"}};
  const state = reducer({...initialState, isLoading: true}, action);
  expect(state.isLoading).toBe(false);
  expect(state.error).toBe('ошибка');
});

test ('loginUserThunk.pending - устанавливает isLoading = true', () => {
  const action = { type: loginUserThunk.pending.type };
  const state = reducer(initialState, action);
  expect(state.isLoading).toBe(true);
});

test ('loginUserThunk.fullfilled - сбрасывает isLoading = false, устанавливаем isInit = true, обновляем данные user', () => {
  const action = {type: loginUserThunk.fulfilled.type, payload: {user: mockUser}};
  const state = reducer({...initialState, isInit: true, isLoading: true}, action);
  expect(state.user).toEqual(mockUser);
  expect(state.isInit).toBe(false);
  expect(state.isLoading).toBe(false);
});

test ('loginUserThunk.rejected - сбрасываем isLoading = false, устанавливаем в state.error message ошибки', () => {
  const action = { type: loginUserThunk.rejected.type, error: { message: "ошибка"}};
  const state = reducer({...initialState, isLoading: true}, action);
  expect(state.isLoading).toBe(false);
  expect(state.error).toBe('ошибка');
});

test ('checkUserAuth.pending - устанавливаем isInit = true', () => {
  const action = { type: checkUserAuth.pending.type };
  const state = reducer(initialState, action);
  expect(state.isInit).toBe(true);
});

test ('checkUserAuth.fullfilled - устанавливаем isInit = false, обновляем state.user', () => {
  const action = { type: checkUserAuth.fulfilled.type, payload: {user: mockUser} };
  const state = reducer({...initialState, isInit: true}, action);
  expect(state.user).toEqual(mockUser);
  expect(state.isInit).toBe(false);
});

test ('checkUserAuth.rejected - устанавливаем isInit = false, сбрасываем state.user = null', () => {
  const action = { type: checkUserAuth.rejected.type };
  const state = reducer({ ...initialState, user: mockUser, isInit: true}, action);
  expect(state.user).toBe(null);
  expect(state.isInit).toBe(false);
});

test ('editUserThunk.pending - устанавливает isLoading = true', () => {
  const action = { type: editUserThunk.pending.type };
  const state = reducer(initialState, action);
  expect(state.isLoading).toBe(true);
});

test ('editUserThunk.fullfilled - сбрасывает isLoading = false, устанавливаем isInit = true, обновляем данные user', () => {
  const action = {type: editUserThunk.fulfilled.type, payload: {user: mockUser}};
  const state = reducer({...initialState, isLoading: true}, action);
  expect(state.user).toEqual(mockUser);
  expect(state.isLoading).toBe(false);
});

test ('editUserThunk.rejected - сбрасываем isLoading = false, устанавливаем в state.error message ошибки', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  const action = { type: editUserThunk.rejected.type, error: { message: "ошибка"}};
  const state = reducer({...initialState, isLoading: true}, action);
  expect(state.isLoading).toBe(false);
  expect(consoleSpy).toHaveBeenCalledWith(expect.objectContaining({
    message: 'ошибка'}));
});

test ('logoutThunk.pending - устанавливаем isLoading = true', () => {
  const action = { type: logoutThunk.pending.type };
  const state = reducer(initialState, action);
  expect(state.isLoading).toBe(true);
});

test ('logoutThunk.fullfilled - сбрасываем isLoading = false, сбрасываем state.user = null', () => {
  const action = { type:logoutThunk.fulfilled.type };
  const state = reducer({ ...initialState, user: mockUser, isLoading: true}, action);
  expect(state.user).toBe(null);
  expect(state.isLoading).toBe(false);
});

test ('logoutThunk.rejected - сбрасываем isLoading = false, устанавливаем в state.error message ошибки', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  const action = { type: logoutThunk.rejected.type, error: { message: "ошибка"}};
  const state = reducer({...initialState, user: mockUser, isLoading: true}, action);
  expect(state.isLoading).toBe(false);
  expect(consoleSpy).toHaveBeenCalledWith(expect.objectContaining({
    message: 'ошибка'}));
});

test ('init - устанавливаем init = true', () => {
  const action = init();
  const state = reducer(initialState, action);
  expect(state.isInit).toBe(true);
})




