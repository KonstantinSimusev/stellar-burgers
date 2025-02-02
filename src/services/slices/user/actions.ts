import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../../utils/burger-api';
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

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (_, { rejectWithValue }) => {
    const response = await getUserApi();

    if (!response?.success) {
      return rejectWithValue(response);
    }

    return response.user;
  }
);

export const fetchRegisterUser = createAsyncThunk<TUser, TRegisterData>(
  'user/fetchRegisterUser',
  async (data, { rejectWithValue }) => {
    const response = await registerUserApi(data);

    if (!response?.success) {
      return rejectWithValue(response);
    }

    const { user, refreshToken, accessToken } = response;

    setTokens(refreshToken, accessToken);

    return user;
  }
);

export const fetchLoginUser = createAsyncThunk<TUser, TLoginData>(
  'user/fetchLoginUser',
  async (data, { rejectWithValue }) => {
    const response = await loginUserApi(data);

    if (!response?.success) {
      return rejectWithValue(response);
    }

    const { user, refreshToken, accessToken } = response;

    setTokens(refreshToken, accessToken);

    return user;
  }
);

export const fetchUpdateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/fetchUpdateUser',
  async (data, { rejectWithValue }) => {
    const response = await updateUserApi(data);

    if (!response?.success) {
      return rejectWithValue(response);
    }

    return response.user;
  }
);

export const fetchLogoutUser = createAsyncThunk(
  'user/fetchLogoutUser',
  async (_, { rejectWithValue }) => {
    const response = await logoutApi();

    if (!response?.success) {
      return rejectWithValue(response);
    }

    deleteTokens();
  }
);
