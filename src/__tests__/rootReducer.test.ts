import { store } from "../store";
import { expect, test } from '@jest/globals';

test("dispatch с неизвестным экшеном не меняет состояние стора", () => {
  const prevState = store.getState();
  store.dispatch({ type: 'UNKNOWN_ACTION' });
  const newState = store.getState();
  expect(newState).toEqual(prevState); 
});
