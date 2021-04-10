import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";

// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, "Adopt Me!"),
//     React.createElement(Pet, {
//       name: "Luna",
//       animal: "Dog",
//       breed: "Havanese",
//     }),
//     React.createElement(Pet, {
//       name: "Pepper",
//       animal: "Bird",
//       breed: "Cockatiel",
//     }),
//     React.createElement(Pet, { name: "Doink", animal: "Cat", breed: "Mix" }),
//   ]);
// };

const App = () => {
  return (
    <StrictMode>
      <div>
        <Router>
          <header>
            <Link to="/">
              <h1>Adopt Me!</h1>
            </Link>
          </header>
          <Switch>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/">
              <SearchParams />
            </Route>
          </Switch>
        </Router>
      </div>
    </StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
