import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../../utils/burger-api';
import { TOrdersData } from '@utils-types';

export const fetchFeeds = createAsyncThunk<TOrdersData>(
  'feeds/fetch',
  async () => await getFeedsApi()
);
