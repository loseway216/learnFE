import { useDispatch, connect } from "react-redux";
import setFilter from "../redux/actionCreators/setFilter";

const VisibilityFilter = ({ setFilter }) => {
  // const dispatch = useDispatch();

  return (
    <div className="filter">
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("todo")}>Todo</button>
      <button onClick={() => setFilter("done")}>Done</button>
    </div>
  );
};

export default connect(null, { setFilter })(VisibilityFilter);
