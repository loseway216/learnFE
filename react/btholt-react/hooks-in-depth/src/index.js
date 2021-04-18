import ReactDOM from "react-dom";
import State from "./hooks/State";
import Effect from "./hooks/Effect";
import Context from "./hooks/Context";
import Ref from "./hooks/Ref";
import Reducer from "./hooks/Reducer";
import Memo from "./hooks/Memo";
import Callback from "./hooks/Callback";
import LayoutEffect from "./hooks/LayoutEffect";
import ImperativeHandle from "./hooks/ImperativeHandle";
import DebugValue from "./hooks/DebugValue";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <State />
      <hr />
      <Effect />
      <hr />
      <Context />
      <hr />
      <Ref />
      <hr />
      <Reducer />
      <hr />
      <Memo />
      <hr />
      <Callback />
      <hr />
      <LayoutEffect />
      <hr />
      <ImperativeHandle />
      <hr />
      <DebugValue />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
