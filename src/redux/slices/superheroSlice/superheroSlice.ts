import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { ServerObject, Superhero } from "@/types";

export const superheroSlice = createSlice({
  name: "superheroSlice",
  initialState,
  reducers: {
    getSuperheroesRequest: (
      state,
      _action: PayloadAction<{ page: number }>
    ) => {
      state.isLoading = true;
    },
    getSuperheroesSuccess: (state, action: PayloadAction<ServerObject>) => {
      state.isLoading = false;
      state.count = action.payload.count;
      state.superheroes = action.payload.results;
    },
    getSuperheroesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    createSuperheroRequest: (
      state,
      _action: PayloadAction<Omit<Superhero, "id">>
    ) => {
      state.isLoading = true;
    },
    createSuperheroSuccess: (state) => {
      state.isLoading = false;
    },
    createSuperheroFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    updateSuperheroRequest: (
      state,
      _action: PayloadAction<{
        superheroId: string;
        superhero: Partial<Superhero>;
      }>
    ) => {
      state.isLoading = true;
    },
    updateSuperheroSuccess: (state) => {
      state.isLoading = false;
    },
    updateSuperheroFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    deleteSuperheroRequest: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    deleteSuperheroSuccess: (state) => {
      state.isLoading = false;
    },
    deleteSuperheroFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
});

export const {
  getSuperheroesRequest,
  getSuperheroesSuccess,
  getSuperheroesFailure,
  createSuperheroRequest,
  createSuperheroSuccess,
  createSuperheroFailure,
  updateSuperheroRequest,
  updateSuperheroSuccess,
  updateSuperheroFailure,
  deleteSuperheroRequest,
  deleteSuperheroSuccess,
  deleteSuperheroFailure,
} = superheroSlice.actions;

export default superheroSlice.reducer;
