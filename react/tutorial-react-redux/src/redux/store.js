import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
// redux-saga
import reducers from "./reducers";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  // typeof window === "object" &&
  //   typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
  //   ? window.__REDUX_DEVTOOLS_EXTENSION__()
  //   : (f) => f,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
