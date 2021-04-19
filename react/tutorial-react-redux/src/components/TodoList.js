import { useSelector, useDispatch, connect } from "react-redux";
import toggleTodo from "../redux/actionCreators/toggleTodo";

function getTodosByFilter(list, filter) {
  const result = list.filter((item) => {
    if (filter === "all") {
      return true;
    } else if (filter === "todo") {
      return item.todo;
    } else if (filter === "done") {
      return !item.todo;
    }
  });
  return result;
}

const TodoList = ({ loading, todos, toggleTodo }) => {
  // const list = useSelector((state) => state.list);
  // const filter = useSelector((state) => state.filter);
  // const dispatch = useDispatch();

  // function handleToggleTodo(id) {
  //   dispatch(toggleTodo(id));
  // }

  return (
    <ul>
      {loading ? <span>Loading...</span> : null}
      {todos.length > 0 ? (
        todos.map((item) => (
          // eslint-disable-next-line
          <li
            className={item.todo ? "" : "done"}
            // onClick={() => handleToggleTodo(item.id)}
            onClick={() => toggleTodo(item.id)}
            key={item.id}
          >
            {item.content}
          </li>
        ))
      ) : (
        <li>无</li>
      )}
    </ul>
  );
};

const mapStateToProps = (state) => {
  const { list, filter, loading } = state;
  const todos = getTodosByFilter(list, filter);
  return { todos, loading };
};

export default connect(mapStateToProps, { toggleTodo })(TodoList);
