import { SerializedError } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";

export type TOrdersState = {
  orders: TOrder[];
  isOrderLoading: boolean;
  isOrdersLoading: boolean;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: null | SerializedError;
};