import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setIsAuthChecked, setUser } from './slice';
import { deleteTokens, getCookie, setTokens } from '../../../utils/cookie';

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((data) => dispatch(setUser(data.user)))
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

export const fetchRegisterUser = createAsyncThunk<TUser, TRegisterData>(
  'user/fetchRegisterUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    const { user, refreshToken, accessToken } = response;
    setTokens(refreshToken, accessToken);
    return user;
  }
);

export const fetchLoginUser = createAsyncThunk<TUser, TLoginData>(
  'user/fetchLoginUser',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    const { user, refreshToken, accessToken } = response;
    setTokens(refreshToken, accessToken);
    return user;
  }
);

export const fetchUpdateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/fetchUpdateUser',
  async (data: Partial<TRegisterData>) => {
    const response = await updateUserApi(data);
    return response.user;
  }
);

export const fetchLogoutUser = createAsyncThunk(
  'user/fetchLogoutUser',
  async () => {
    logoutApi();
    deleteTokens();
  }
);
