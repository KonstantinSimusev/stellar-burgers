import { TIngredient } from "@utils-types";
import { SerializedError } from "@reduxjs/toolkit";

export type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: null | SerializedError;
};