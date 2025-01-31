import { rootReducer, store } from '../../src/services/store';

describe('Тестирование rootReducer', () => {
  test('Вызов rootReducer с UNKNOWN_ACTION и undefined возвращает начальное состояние хранилища', () => {
    const before = store.getState();

    const after = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(after).toEqual(before);
  });
});
