import { all } from "redux-saga/effects";
import superheroesWatcher from "@/redux/sagas/superheroSaga/superheroSaga";
import currentSuperheroWatcher from "@/redux/sagas/currentSuperheroSaga/currentSuperheroSaga";

export default function* rootSaga() {
  yield all([superheroesWatcher(), currentSuperheroWatcher()]);
}
