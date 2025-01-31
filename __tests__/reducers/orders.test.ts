import {
  fetchOrder,
  fetchOrders,
  createOrder
} from '../../src/services/slices/orders/actions';
import { ordersSlice, initialState } from '../../src/services/slices/orders/slice';

const mockData = [
  {
    _id: '6799e0f1133acd001be4d3e9',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093c'
    ],
    owner: '6798ae96133acd001be4d276',
    status: 'done',
    name: 'Краторный space метеоритный бургер',
    createdAt: '2025-01-29T08:04:01.273Z',
    updatedAt: '2025-01-29T08:04:01.927Z',
    number: 67135,
    __v: 0
  }
];

describe('Тестирование ordersReducer', () => {
  describe('Асинхронный запрос получения заказов: fetchOrders', () => {
    test('Начало запроса: fetchOrders.pending', () => {
      const state = ordersSlice.reducer(
        initialState,
        fetchOrders.pending('pending')
      );

      expect(state.isOrdersLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('Успешное выполнение запроса: fetchOrders.fulfilled', () => {
      const state = ordersSlice.reducer(
        initialState,
        fetchOrders.fulfilled(mockData, 'fulfilled')
      );

      expect(state.isOrdersLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.orders).toEqual(mockData);
    });

    test('Ошибка запроса: fetchOrders.rejected', () => {
      const error = 'fetchOrders.rejected';

      const state = ordersSlice.reducer(
        initialState,
        fetchOrders.rejected(new Error(error), 'rejected')
      );

      expect(state.isOrdersLoading).toBeFalsy();
      expect(state.error?.message).toEqual(error);
    });
  });

  describe('Асинхронный запрос получения заказа: fetchOrder', () => {
    test('Начало запроса: fetchOrder.pending', () => {
      const state = ordersSlice.reducer(
        initialState,
        fetchOrder.pending('pending', mockData[0].number)
      );

      expect(state.isOrderLoading).toBeTruthy();
    });

    test('Успешное выполнение запроса: fetchOrder.fulfilled', () => {
      const state = ordersSlice.reducer(
        initialState,
        fetchOrder.fulfilled(mockData[0], 'fulfilled', mockData[0].number)
      );

      expect(state.isOrderLoading).toBeFalsy();
      expect(state.orderModalData).toEqual(mockData[0]);
    });

    test('Ошибка запроса: fetchOrder.rejected', () => {
      const error = 'fetchOrder.rejected';

      const state = ordersSlice.reducer(
        initialState,
        fetchOrder.rejected(new Error(error), 'rejected', -1)
      );

      expect(state.isOrderLoading).toBeFalsy();
    });
  });

  describe('Асинхронный запрос создания заказа: createOrder', () => {
    test('Начало запроса: createOrder.pending', () => {
      const state = ordersSlice.reducer(
        initialState,
        createOrder.pending('pending', mockData[0].ingredients)
      );

      expect(state.orderRequest).toBeTruthy();
    });

    test('Успешное выполнение запроса: createOrder.fulfilled', () => {
      const state = ordersSlice.reducer(
        initialState,
        createOrder.fulfilled(
          { order: mockData[0], name: 'EXAMPLE' },
          'fulfilled',
          mockData[0].ingredients
        )
      );

      expect(state.orderRequest).toBeFalsy();
      expect(state.orderModalData).toEqual(mockData[0]);
    });

    test('Ошибка запроса: createOrder.rejected', () => {
      const error = 'createOrder.rejected';

      const state = ordersSlice.reducer(
        initialState,
        createOrder.rejected(new Error(error), 'rejected', [])
      );

      expect(state.orderRequest).toBeFalsy();
    });
  });
});
