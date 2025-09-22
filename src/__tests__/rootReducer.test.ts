import { store }from "../store";
import { initialState as constructState} from "../slices/constructSlice";
import { initialState as feedsState} from "../slices/feedsSlice";
import { initialState as orderState} from "../slices/orderSlice";
import { initialState as productState} from "../slices/productSlice";
import { initialState as userState} from "../slices/userSlice";
import { expect, test } from '@jest/globals';

  test("rootReducer, проверка инициализации", ()=> {
    const state = store.getState();
    expect(state).toEqual({
      products: productState,
      user: userState,
      orders: orderState,
      feeds: feedsState,
      construct: constructState,
    });

})
