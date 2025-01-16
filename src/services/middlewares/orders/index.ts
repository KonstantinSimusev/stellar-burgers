import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { createOrder } from '../../slices/orders/actions';
import { resetConstructor } from '../../slices/builder/slice';
import { AppDispatch, RootState } from '../../store';

export const ordersMiddleware: Middleware =
  (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => (action) => {
    if (createOrder.fulfilled.match(action)) {
      store.dispatch(resetConstructor());
    }

    next(action);
  };
