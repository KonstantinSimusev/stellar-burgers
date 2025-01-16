import { createSlice } from '@reduxjs/toolkit';
import { TOrdersState } from './type';
import { createOrder, fetchOrder, fetchOrders } from './actions';

export const initialState: TOrdersState = {
  isOrderLoading: false,
  isOrdersLoading: false,
  orderRequest: false,
  orderModalData: null,
  error: null,
  data: []
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderModalData(state) {
      state.orderModalData = null;
    }
  },
  selectors: {
    selectOrders: (state) => state.data,
    selectIsOrderLoading: (state) => state.isOrderLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orderModalData = action.payload;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.isOrderLoading = false;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isOrdersLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isOrdersLoading = false;
        state.error = action.error;
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const { resetOrderModalData } = ordersSlice.actions;
export const { selectIsOrderLoading, selectOrders } = ordersSlice.selectors;
