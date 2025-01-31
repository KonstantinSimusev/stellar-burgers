import {
  addIngredient,
  deleteIngredient,
  moveIngredient,
  initialState,
  builderSlice
} from '../../src/services/slices/builder/slice';

const bun = {
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
};

const sauceOne = {
  _id: '643d69a5c3f7b9001cfa0945',
  id: '1234567891',
  name: 'Соус с шипами Антарианского плоскоходца',
  type: 'sauce',
  proteins: 101,
  fat: 99,
  carbohydrates: 100,
  calories: 100,
  price: 88,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
  __v: 0
};

const sauceTwo = {
  _id: '643d69a5c3f7b9001cfa0945',
  id: '1234567892',
  name: 'Соус с шипами Антарианского плоскоходца',
  type: 'sauce',
  proteins: 101,
  fat: 99,
  carbohydrates: 100,
  calories: 100,
  price: 88,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
  __v: 0
};

describe('Тестирование builderReducer', () => {
  describe('Обработка экшенов с ингридиентами', () => {
    test('Добавление ингредиента', () => {
      const state = builderSlice.reducer(initialState, addIngredient(sauceOne));

      // В конструкторе появился 1 ингридиент
      expect(state.builder.ingredients).toHaveLength(1);

      const updatedObject = { ...state.builder.ingredients[0] } as Record<
        string,
        any
      >;
      delete updatedObject['id'];

      const initialObject = { ...sauceOne } as Record<string, any>;
      delete initialObject['id'];

      expect(updatedObject).toEqual(initialObject);
    });

    test('Удаление ингредиента', () => {
      const _initialState = {
        builder: {
          bun: null,
          ingredients: [sauceOne, sauceTwo]
        }
      };

      const state = builderSlice.reducer(
        _initialState,
        deleteIngredient(sauceOne.id)
      );

      // В конструкторе удален 1 ингридиент
      expect(state.builder.ingredients).toHaveLength(1);
      expect(state.builder.ingredients[0]).toEqual(sauceTwo);
    });

    describe('Передвижение ингредиентов', () => {
      test('Передвижение вниз', () => {
        const _initialState = {
          builder: {
            bun: null,
            ingredients: [sauceOne, sauceTwo]
          }
        };

        const state = builderSlice.reducer(
          _initialState,
          moveIngredient({ index: 0, isUp: false })
        );

        // В конструкторе изменилась позиция ингредиентов
        expect(state.builder.ingredients).toHaveLength(2);
        expect(state.builder.ingredients[0]).toEqual(sauceTwo);
        expect(state.builder.ingredients[1]).toEqual(sauceOne);
      });

      test('Передвижение вверх', () => {
        const _initialState = {
          builder: {
            bun: null,
            ingredients: [sauceOne, sauceTwo]
          }
        };

        const state = builderSlice.reducer(
          _initialState,
          moveIngredient({ index: 1, isUp: true })
        );

        // В конструкторе изменилась позиция ингредиентов
        expect(state.builder.ingredients).toHaveLength(2);
        expect(state.builder.ingredients[0]).toEqual(sauceTwo);
        expect(state.builder.ingredients[1]).toEqual(sauceOne);
      });
    });
  });
});
