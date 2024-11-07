import { call, put, takeLatest } from "redux-saga/effects";
import HttpService from "@/services/HttpService/HttpService";
import { AxiosError } from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import type { ServerObject, Superhero } from "@/types";
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
} from "@/redux/slices/superheroSlice/superheroSlice";
import { removeServiceModal } from "@/redux/slices/serviceModalSlice";
import { ServiceModalName } from "@/enums";
import { getSuperheroRequest } from "@/redux/slices/currentSuperheroSlice/currentSuperheroSlice";
import { type Id, toast } from "react-toastify";

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
  payload: { superheroData, toastId },
}: PayloadAction<{
  superheroData: Omit<Superhero, "id">;
  toastId: Id;
}>) {
  try {
    const response: AxiosResponse<Superhero> = yield call(
      HttpService.post,
      "/superheroes",
      superheroData
    );

    if (response.status === 201) {
      yield put(createSuperheroSuccess());
      yield put(removeServiceModal(ServiceModalName.AddSuperhero));
      toast.update(toastId, {
        render: "Superhero created!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      yield put(
        getSuperheroesRequest({
          page: 1,
        })
      );
    }
  } catch (error) {
    toast.update(toastId, {
      render: "Failed to create superhero!",
      type: "error",
      isLoading: false,
      autoClose: 5000,
    });

    console.error(error);
    yield put(createSuperheroFailure("An unexpected error occurred."));
  }
}

function* deleteSuperheroSaga({
  payload: { superheroId, toastId },
}: PayloadAction<{ superheroId: string; toastId: Id }>) {
  try {
    const response: AxiosResponse = yield call(
      HttpService.delete,
      `/superheroes/${superheroId}`
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

      toast.update(toastId, {
        render: "Superhero deleted!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    }
  } catch (error) {
    toast.update(toastId, {
      render: "Failed to delete superhero!",
      type: "error",
      isLoading: false,
      autoClose: 5000,
    });

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
  payload: { superheroId, superhero, toastId },
}: PayloadAction<{
  superheroId: string;
  superhero: Partial<Superhero>;
  toastId: Id;
}>) {
  try {
    const response: AxiosResponse<Superhero> = yield call(
      HttpService.patch,
      `/superheroes/${superheroId}`,
      superhero
    );

    if (response.status === 200) {
      yield put(removeServiceModal(ServiceModalName.EditSuperhero));
      toast.update(toastId, {
        render: "Superhero updated!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      yield put(
        getSuperheroesRequest({
          page: 1,
        })
      );
      yield put(getSuperheroRequest(superheroId));
    }
  } catch (error) {
    toast.update(toastId, {
      render: "Failed to update superhero!",
      type: "error",
      isLoading: false,
      autoClose: 5000,
    });

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
