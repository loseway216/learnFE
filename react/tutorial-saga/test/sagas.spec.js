import test from "tape";
import { put, call } from "redux-saga/effects";
import { addTodoAsync, delay } from "../src/redux/sagas";
import addTodo from "../src/redux/actionCreators/addTodo";

test("addTodoAsync Saga test", (assert) => {
  const gen = addTodoAsync("test content");

  assert.deepEqual(
    gen.next().value,
    put({ type: "START_LOADING" }),
    "addTodoAsync Saga must dispatch a START_LOADING action"
  );

  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    "addTodoAsync Saga must call delay(1000)"
  );

  assert.deepEqual(
    gen.next().value,
    put({ type: "END_LOADING" }),
    "addTodoAsync Saga must dispatch a END_LOADING action"
  );

  assert.deepEqual(
    gen.next().value,
    put(addTodo("test content")),
    "addTodoAsync Saga must dispatch addTodo action"
  );

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    "incrementAsync Saga must be done"
  );

  assert.end();
});
