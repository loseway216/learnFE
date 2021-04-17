import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import TodoApp from "./TodoApp";

render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById("root")
);
