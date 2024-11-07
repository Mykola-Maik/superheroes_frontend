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
      _state,
      _action: PayloadAction<Omit<Superhero, "id">>
    ) => {},
    createSuperheroSuccess: (_state) => {},
    createSuperheroFailure: (state, action: PayloadAction<string>) => {
      state.errors = action.payload;
    },
    updateSuperheroRequest: (
      _state,
      _action: PayloadAction<{
        superheroId: string;
        superhero: Partial<Superhero>;
      }>
    ) => {},
    updateSuperheroSuccess: (_state) => {},
    updateSuperheroFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    deleteSuperheroRequest: (_state, _action: PayloadAction<string>) => {},
    deleteSuperheroSuccess: (_state) => {},
    deleteSuperheroFailure: (state, action: PayloadAction<string>) => {
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
