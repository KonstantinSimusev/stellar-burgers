import { createSlice } from '@reduxjs/toolkit';
import { TFeedsState } from './type';
import { fetchFeeds } from './actions';

export const initialState: TFeedsState = {
  feed: {
    orders: [],
    total: NaN,
    totalToday: NaN
  },
  isLoading: true
};

export const feedsSlise = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectFeed: (state) => state.feed,
    selectIsloading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feed = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFeeds.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { selectIsloading, selectFeed } = feedsSlise.selectors;

export default feedsSlise.reducer;
