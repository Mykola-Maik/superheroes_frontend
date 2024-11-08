import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import type { Superhero } from "@/types";

export const currentSuperheroSlice = createSlice({
  name: "currentSuperheroSlice",
  initialState,
  reducers: {
    getSuperheroRequest: (state, _action: PayloadAction<string>) => {
      state.errors = "";
      state.isLoading = true;
    },
    getSuperheroSuccess: (state, action: PayloadAction<Superhero>) => {
      state.errors = "";
      state.isLoading = false;
      state.superhero = action.payload;
    },
    getSuperheroFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
});

export const { getSuperheroRequest, getSuperheroSuccess, getSuperheroFailure } =
  currentSuperheroSlice.actions;

export default currentSuperheroSlice.reducer;
