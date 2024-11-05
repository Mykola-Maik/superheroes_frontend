import { all } from "redux-saga/effects";
import superheroesWatcher from "@/redux/sagas/superheroSaga/superheroSaga";

export default function* rootSaga() {
  yield all([superheroesWatcher()]);
}
