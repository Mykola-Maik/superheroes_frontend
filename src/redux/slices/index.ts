import { combineReducers } from "@reduxjs/toolkit";
import serviceModalReducer from "./serviceModalSlice/serviceModalSlice";
import superheroReducer from "./superheroSlice/superheroSlice";

const rootReducer = combineReducers({
  serviceModalSlice: serviceModalReducer,
  superheroSlice: superheroReducer,
});

export default rootReducer;
