import { combineReducers } from "@reduxjs/toolkit";
import serviceModalReducer from "./serviceModalSlice/serviceModalSlice";

const rootReducer = combineReducers({
  serviceModalSlice: serviceModalReducer,
});

export default rootReducer;
