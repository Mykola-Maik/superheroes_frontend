import {
  getSuperheroFailure,
  getSuperheroRequest,
  getSuperheroSuccess,
} from "@/redux/slices/currentSuperheroSlice/currentSuperheroSlice";
import HttpService from "@/services/HttpService/HttpService";
import { Superhero } from "@/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

function* getCurrentSuperheroSaga({ payload }: PayloadAction<string>) {
  try {
    const response: AxiosResponse<Superhero> = yield call(
      HttpService.get,
      `/superheroes/${payload}`
    );

    yield put(getSuperheroSuccess(response.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error);
      yield put(getSuperheroFailure(error.message));
    } else {
      console.error("An unknown error occurred.");
      yield put(getSuperheroFailure("An unknown error occurred."));
    }
  }
}

function* currentSuperheroWatcher() {
  yield takeLatest(getSuperheroRequest.type, getCurrentSuperheroSaga);
}

export default currentSuperheroWatcher;