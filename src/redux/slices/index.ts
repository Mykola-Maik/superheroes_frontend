import { combineReducers } from "@reduxjs/toolkit";
import serviceModalReducer from "@/redux/slices/serviceModalSlice/serviceModalSlice";
import superheroReducer from "@/redux/slices/superheroSlice/superheroSlice";
import currentSuperheroReducer from "@/redux/slices/currentSuperheroSlice/currentSuperheroSlice";

const rootReducer = combineReducers({
  serviceModalSlice: serviceModalReducer,
  superheroSlice: superheroReducer,
  currentSuperheroSlice: currentSuperheroReducer,
});

export default rootReducer;
