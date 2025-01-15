import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import { TConstructorState } from './type';

export const initialState: TConstructorState = {
  builder: {
    bun: null,
    ingredients: []
  }
};

export const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient | null>) {
      state.builder.bun = action.payload;
    },
    addIngredient: {
      prepare: (payload: TIngredient) => ({
        payload: { ...payload, id: uuidv4() }
      }),
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.builder.bun = action.payload;
        } else {
          state.builder.ingredients.push(action.payload);
        }
      }
    },
    deleteIngredient(state, action: PayloadAction<string>) {
      state.builder.ingredients = state.builder.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient(
      state,
      action: PayloadAction<{ index: number; isUp: boolean }>
    ) {
      const ingredient = state.builder.ingredients[action.payload.index];

      if (action.payload.isUp) {
        state.builder.ingredients[action.payload.index] =
          state.builder.ingredients[action.payload.index - 1];
        state.builder.ingredients[action.payload.index - 1] = ingredient;
      } else {
        state.builder.ingredients[action.payload.index] =
          state.builder.ingredients[action.payload.index + 1];
        state.builder.ingredients[action.payload.index + 1] = ingredient;
      }
    },
    updateBuilder(state) {
      state.builder.bun = null;
      state.builder.ingredients = [];
    }
  },
  selectors: {
    selectBurgerBuilder: (state) => state.builder
  }
});

export const {
  setBun,
  addIngredient,
  deleteIngredient,
  moveIngredient,
  updateBuilder
} = builderSlice.actions;

export const { selectBurgerBuilder } = builderSlice.selectors;
