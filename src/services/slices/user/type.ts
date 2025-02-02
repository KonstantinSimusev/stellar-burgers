import { SerializedError } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginError?: SerializedError;
  registerError?: SerializedError;
};