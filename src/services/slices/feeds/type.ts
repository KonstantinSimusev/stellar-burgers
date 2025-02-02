import { TOrdersData } from '@utils-types';
import { SerializedError } from '@reduxjs/toolkit';

export type TFeedsState = {
  feed: TOrdersData;
  isLoading: boolean;
  error: null | SerializedError;
};