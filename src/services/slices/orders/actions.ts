import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../../utils/burger-api';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => await getOrdersApi()
);

export const fetchOrder = createAsyncThunk<TOrder, number>(
  'orders/fetchOrder',
  async (data, { rejectWithValue }) => {
    const response = await getOrderByNumberApi(data);

    if (!response?.success) {
      return rejectWithValue(response);
    }

    return response.orders[0];
  }
);

export const createOrder = createAsyncThunk<
  {
    order: TOrder;
    name: string;
  },
  string[]
>('orders/create', async (data, { rejectWithValue }) => {
  const response = await orderBurgerApi(data);

  if (!response?.success) {
    return rejectWithValue(response);
  }

  return { order: response.order, name: response.name };
});
