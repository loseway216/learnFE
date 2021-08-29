import { useState, StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const App = () => {
  return <div></div>;
};

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
