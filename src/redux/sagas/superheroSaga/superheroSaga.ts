import { call, put, takeLatest } from "redux-saga/effects";
import HttpService from "@/services/HttpService/HttpService";
import { AxiosError } from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import { ServerObject, Superhero } from "@/types";
import {
  createSuperheroFailure,
  createSuperheroRequest,
  createSuperheroSuccess,
  deleteSuperheroFailure,
  deleteSuperheroRequest,
  deleteSuperheroSuccess,
  getSuperheroesFailure,
  getSuperheroesRequest,
  getSuperheroesSuccess,
  updateSuperheroFailure,
  updateSuperheroRequest,
  updateSuperheroSuccess,
} from "@/redux/slices/superheroSlice/superheroSlice";
import { removeServiceModal } from "@/redux/slices/serviceModalSlice";
import { ServiceModalName } from "@/enums";

function* getSuperheroesSaga({
  payload: { page },
}: PayloadAction<{ page: number }>) {
  try {
    const response: AxiosResponse<ServerObject> = yield call(
      HttpService.get,
      `/superheroes?page=${page}`
    );

    yield put(getSuperheroesSuccess(response.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error);
      yield put(getSuperheroesFailure(error.message));
    } else {
      console.error("An unknown error occurred.");
      yield put(getSuperheroesFailure("An unknown error occurred."));
    }
  }
}

function* createSuperheroSaga({
  payload,
}: PayloadAction<Omit<Superhero, "id">>) {
  try {
    const response: AxiosResponse<Superhero> = yield call(
      HttpService.post,
      "/superheroes",
      payload
    );

    if (response.status === 201) {
      yield put(createSuperheroSuccess());
      yield put(removeServiceModal(ServiceModalName.AddSuperhero));
      yield put(
        getSuperheroesRequest({
          page: 1,
        })
      );
    }
  } catch (error) {
    console.error(error);
    yield put(createSuperheroFailure("An unexpected error occurred."));
  }
}

function* deleteSuperheroSaga({ payload }: PayloadAction<string>) {
  try {
    const response: AxiosResponse = yield call(
      HttpService.delete,
      `/superheroes/${payload}`
    );

    if (response.status === 200) {
      yield put(deleteSuperheroSuccess());
      yield put(removeServiceModal(ServiceModalName.DeleteSuperhero));
      yield put(
        getSuperheroesRequest({
          page: 1,
        })
      );

      window.location.href = "/";
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
      yield put(deleteSuperheroFailure(error.message));
    } else {
      console.error("An unknown error occurred.");
      yield put(deleteSuperheroFailure("An unknown error occurred."));
    }
  }
}

function* updateSuperheroSaga({
  payload: { superheroId, superhero },
}: PayloadAction<{ superheroId: string; superhero: Partial<Superhero> }>) {
  try {
    const response: AxiosResponse<Superhero> = yield call(
      HttpService.patch,
      `/superheroes/${superheroId}`,
      superhero
    );

    if (response.status === 200) {
      yield put(updateSuperheroSuccess());
      yield put(removeServiceModal(ServiceModalName.EditSuperhero));
      yield put(
        getSuperheroesRequest({
          page: 1,
        })
      );
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
      yield put(updateSuperheroFailure(error.message));
    }

    console.error(error);
    yield put(updateSuperheroFailure("An unexpected error occurred."));
  }
}

function* superheroesWatcher() {
  yield takeLatest(getSuperheroesRequest.type, getSuperheroesSaga);
  yield takeLatest(createSuperheroRequest.type, createSuperheroSaga);
  yield takeLatest(deleteSuperheroRequest.type, deleteSuperheroSaga);
  yield takeLatest(updateSuperheroRequest.type, updateSuperheroSaga);
}

export default superheroesWatcher;
