import { put, takeEvery, all, takeLatest } from "redux-saga/effects";

import addTodo from "./actionCreators/addTodo";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function* addTodoAsync(action) {
  yield put({ type: "START_LOADING" });
  yield delay(1000);
  yield put({ type: "END_LOADING" });
  yield put(addTodo(action.payload.content));
}

export default function* rootSaga() {
  // yield all([helloSaga(), watchAddTodoAsync()]);
  yield takeLatest("ADD_TODO_ASYNC", addTodoAsync);
  yield takeEvery("FETCH_USERS", addTodoAsync);
  console.log("Hello Sagas!");
}
