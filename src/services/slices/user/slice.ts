import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  fetchLoginUser,
  fetchLogoutUser,
  fetchRegisterUser,
  fetchUpdateUser
} from './actions';
import { TUserState } from './type';

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  isLoading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectIsloading: (state) => state.isLoading,
    selectRegisterError: (state) => state.registerError,
    selectLoginError: (state) => state.loginError
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isLoading = true;
        state.registerError = undefined;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.registerError = undefined;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.registerError = action.error;
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.isLoading = true;
        state.loginError = undefined;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.loginError = undefined;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isLoading = true;
        state.loginError = action.error;
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUpdateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchLogoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(fetchLogoutUser.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { setIsAuthChecked, setUser } = userSlice.actions;
export const {
  selectUser,
  selectIsAuthChecked,
  selectIsAuthenticated,
  selectIsloading,
  selectRegisterError,
  selectLoginError
} = userSlice.selectors;
