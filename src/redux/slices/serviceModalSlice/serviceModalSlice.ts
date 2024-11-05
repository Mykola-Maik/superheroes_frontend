import { createSlice } from "@reduxjs/toolkit";
import { ServiceModalName } from "@/enums";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ServiceModalState } from "@/types";

const initialState: ServiceModalState = {};

export const serviceModalSlice = createSlice({
  name: "serviceModalSlice",
  initialState,
  reducers: {
    addServiceModal: (
      state,
      {
        payload,
      }: PayloadAction<{
        type: ServiceModalName;
        payload?: { [key: string]: any };
      }>
    ) => {
      state[payload.type] = payload.payload || {};
    },
    removeServiceModal: (
      state,
      { payload }: PayloadAction<ServiceModalName>
    ) => {
      delete state[payload];
    },
    removeAllServiceModals: () => ({}),
  },
});

export const { addServiceModal, removeServiceModal, removeAllServiceModals } =
  serviceModalSlice.actions;

export default serviceModalSlice.reducer;
