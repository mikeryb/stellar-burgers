import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  TRegisterData,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData
} from '@api';
import { TUser } from '@utils-types';
import { setCookie, deleteCookie } from '../utils/cookie';
import { RootState } from '../store';

export interface UserState {
  isInit: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string;
}

const initialState: UserState = {
  isInit: false,
  isLoading: false,
  user: null,
  error: ''
};

export const registerUserThunk = createAsyncThunk<TAuthResponse, TRegisterData>(
  'user/register',
  async (userData: TRegisterData) => {
    try {
      const response = await registerUserApi(userData);
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk<TAuthResponse, TLoginData>(
  'user/login',
  async (userData: TLoginData) => {
    try {
      const response = await loginUserApi(userData);
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export const checkUserAuth = createAsyncThunk('user/checkUser', async () => {
  try {
    return await getUserApi();
  } catch (error: any) {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
    throw new Error(error.message);
  }
});

export const editUserThunk = createAsyncThunk(
  'user/edit',
  async (data: TRegisterData) => {
    try {
      return await updateUserApi(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk('user/logout', async () => {
  try {
    const response = await logoutApi();
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Unknown error';
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.error = '';
      state.isLoading = false;
      state.user = action.payload.user;
      state.isInit = true;
    });
    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Unknown error';
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.error = '';
      state.isLoading = false;
      state.user = action.payload.user;
      state.isInit = false;
    });
    builder.addCase(checkUserAuth.pending, (state) => {
      state.isInit = true;
    });
    builder.addCase(checkUserAuth.rejected, (state) => {
      state.isInit = false;
      state.user = null;
    });
    builder.addCase(checkUserAuth.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isInit = false;
    });
    builder.addCase(editUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error);
    });
    builder.addCase(editUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(logoutThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutThunk.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error);
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.isInit = false;
      state.user = null;
      state.isLoading = false;
    });
  }
});

export const selectError = (state: RootState) => state.user.error;
export const selectUserName = (state: RootState) => state.user.user?.name;
export const selectUser = (state: RootState) => state.user.user;

export const { init } = userSlice.actions;
export default userSlice.reducer;
