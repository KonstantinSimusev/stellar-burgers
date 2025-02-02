import { fetchFeeds } from '../../src/services/slices/feeds/actions';
import { feedsSlise, initialState } from '../../src/services/slices/feeds/slice';

const mockData = {
  feed: {
    orders: [],
    total: 1,
    totalToday: 1
  },
  isLoading: true,
  error: null
};

describe('Тестирование feedsReducer', () => {
  describe('Асинхронный запрос получения ленты заказов: fetchFeeds', () => {
    test('Начало запроса: fetchFeeds.pending', () => {
      const state = feedsSlise.reducer(initialState, fetchFeeds.pending('pending'));

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('Успешное выполнение запроса: fetchFeeds.fulfilled', () => {
      const state = feedsSlise.reducer(
        initialState,
        fetchFeeds.fulfilled(mockData.feed, 'fulfilled')
      );

      expect(state.feed).toEqual(mockData.feed);
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
    });

    test('Ошибка запроса: fetchFeeds.rejected', () => {
      const error = 'fetchFeeds.rejected';

      const state = feedsSlise.reducer(
        initialState,
        fetchFeeds.rejected(new Error(error), 'rejected')
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error?.message).toEqual(error);
    });
  });
});
