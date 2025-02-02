import { TConstructorIngredient, TIngredient } from '@utils-types';

export type TConstructorState = {
  builder: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  }
};
