import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { userSlice } from '../services/slices/user/slice';
import { ingredientsSlice } from './slices/ingredients/slice';
import { builderSlice } from './slices/builder/slice';
import { feedsSlise } from './slices/feeds/slice';
import { ordersSlice } from './slices/orders/slice';

const rootReducer = combineSlices(
  userSlice,
  ingredientsSlice,
  builderSlice,
  feedsSlise,
  ordersSlice
); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
