import { useOutlet } from "react-router";
import { Link, Outlet } from "react-router-dom";

export default function App({ children }) {
  const ele = useOutlet();
  console.log(children);

  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet />
    </div>
  );
}
