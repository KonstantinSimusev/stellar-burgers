import {
  fetchUser,
  fetchRegisterUser,
  fetchLoginUser,
  fetchUpdateUser,
  fetchLogoutUser
} from '../../src/services/slices/user/actions';
import { userSlice, initialState } from '../../src/services/slices/user/slice';

const userMockData = {
  email: 'mars@mars.mars',
  name: 'mars'
};

const registerMockData = {
  email: 'mars@mars.mars',
  name: 'mars',
  password: 'mars'
};

const loginMockData = {
  email: 'mars@mars.mars',
  password: 'mars'
};

describe('Тестирование userReducer', () => {
  // Проверка авторизации
  describe('Асинхронный запрос проверки авторизации: fetchUser', () => {
    test('Успешное выполнение запроса: fetchUser.fulfilled', () => {
      const state = userSlice.reducer(
        initialState,
        fetchUser.fulfilled(userMockData, 'fulfilled')
      );

      expect(state.isAuthenticated).toBeTruthy();
      expect(state.isAuthChecked).toBeTruthy();
      expect(state.user).toEqual(userMockData);
    });

    test('Ошибка запроса: fetchUser.rejected', () => {
      const error = 'fetchUser.rejected';

      const state = userSlice.reducer(
        initialState,
        fetchUser.rejected(new Error(error), 'rejected')
      );

      expect(state.isAuthenticated).toBeFalsy();
      expect(state.isAuthChecked).toBeTruthy();
    });
  });
});

// Регистрация
describe('Асинхронный запрос регистрации: fetchRegisterUser', () => {
  test('Начало запроса: fetchRegisterUser.pending', () => {
    const state = userSlice.reducer(
      initialState,
      fetchRegisterUser.pending('pending', registerMockData)
    );

    expect(state.registerError).toBeUndefined();
  });

  test('Успешное выполнение запроса: fetchRegisterUser.fulfilled', () => {
    const state = userSlice.reducer(
      initialState,
      fetchRegisterUser.fulfilled(userMockData, 'fulfilled', registerMockData)
    );

    expect(state.user).toEqual(userMockData);
    expect(state.isAuthenticated).toBeTruthy();
    expect(state.registerError).toBeUndefined();
  });

  test('Ошибка запроса: fetchRegisterUser.rejected', () => {
    const error = 'fetchRegisterUser.rejected';

    const state = userSlice.reducer(
      initialState,
      fetchRegisterUser.rejected(new Error(error), 'rejected', registerMockData)
    );

    expect(state.registerError?.message).toEqual(error);
  });

  // Логин
  describe('Асинхронный запрос входа в аккаунт: fetchLoginUser', () => {
    test('Начало запроса: fetchLoginUser.pending', () => {
      const state = userSlice.reducer(
        initialState,
        fetchLoginUser.pending('pending', loginMockData)
      );

      expect(state.loginError).toBeUndefined();
    });

    test('Успешное выполнение запроса: fetchLoginUser.fulfilled', () => {
      const state = userSlice.reducer(
        initialState,
        fetchLoginUser.fulfilled(userMockData, 'fulfilled', loginMockData)
      );

      expect(state.isAuthenticated).toBeTruthy();
      expect(state.loginError).toBeUndefined();
      expect(state.user).toEqual(userMockData);
    });

    test('Ошибка запроса: fetchLoginUser.rejected', () => {
      const error = 'login.rejected';

      const state = userSlice.reducer(
        initialState,
        fetchLoginUser.rejected(new Error(error), 'rejected', loginMockData)
      );

      expect(state.loginError?.message).toEqual(error);
    });
  });

  // Обновление информации о пользователе
  describe('Асинхронный запрос редактирования информации пользователя: fetchUpdateUser', () => {
    test('Результат запроса: fetchUpdateUser.fulfilled', () => {
      const state = userSlice.reducer(
        initialState,
        fetchUpdateUser.fulfilled(userMockData, 'fulfilled', userMockData)
      );

      expect(state.user).toEqual(userMockData);
    });
  });

  // Выход
  describe('Асинхронный запрос выхода из аккаунта: fetchLogoutUser', () => {
    test('Успешное выполнение запроса: fetchLogoutUser.fulfilled', () => {
      const state = userSlice.reducer(
        initialState,
        fetchLogoutUser.fulfilled(undefined, 'fulfilled')
      );

      expect(state.isAuthenticated).toBeFalsy();
      expect(state.user).toEqual(null);
    });
  });
});
