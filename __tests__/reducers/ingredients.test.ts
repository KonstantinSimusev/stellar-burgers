import { fetchIngredients } from '../../src/services/slices/ingredients/actions';
import { ingredientsSlice, initialState } from '../../src/services/slices/ingredients/slice';

const ingredients = [
  {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0
  }
];

describe('Тестирование ingredientsReducer', () => {
  describe('Асинхронный запрос получения ингридиентов: fetchIngredients', () => {
    test('Начало запроса: fetchIngredients.pending', () => {
      const state = ingredientsSlice.reducer(
        initialState,
        fetchIngredients.pending('pending')
      );

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('Успешное выполнение запроса: fetchIngredients.fulfilled', () => {
      const state = ingredientsSlice.reducer(
        initialState,
        fetchIngredients.fulfilled(ingredients, 'fulfilled')
      );

      expect(state.ingredients).toEqual(ingredients);
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
    });

    test('Ошибка запроса: fetchIngredients.rejected', () => {
      const error = 'fetchIngredients.rejected';

      const state = ingredientsSlice.reducer(
        initialState,
        fetchIngredients.rejected(new Error(error), 'rejected')
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error?.message).toEqual(error);
    });
  });
});
