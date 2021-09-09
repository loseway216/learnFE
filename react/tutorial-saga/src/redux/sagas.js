import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import addTodo from "./actionCreators/addTodo";


export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function* addTodoAsync(action) {
  yield put({ type: "START_LOADING" });
  // 为了测试，不要直接进行异步调用，而是用call，返回的是object
  // yield delay(1000);
  yield call(delay, 1000);
  yield put({ type: "END_LOADING" });
  yield put(addTodo(action.payload.content));
}

export default function* rootSaga() {
  // yield all([helloSaga(), watchAddTodoAsync()]);
  yield takeLatest("ADD_TODO_ASYNC", addTodoAsync);
  yield takeEvery("FETCH_USERS", addTodoAsync);
  console.log("Hello Sagas!");
}
