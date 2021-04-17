import { useSelector, useDispatch, connect } from "react-redux";
import toggleTodo from "../redux/actionCreators/toggleTodo";

const TodoList = ({ todos, toggleTodo }) => {
  // const list = useSelector((state) => state.list);
  // const filter = useSelector((state) => state.filter);
  // const dispatch = useDispatch();

  // function getTodosByFilter(list, filter) {
  //   const result = list.filter((item) => {
  //     if (filter === "all") {
  //       return true;
  //     } else if (filter === "todo") {
  //       return item.todo;
  //     } else if (filter === "done") {
  //       return !item.todo;
  //     }
  //   });
  //   return result;
  // }

  // function handleToggleTodo(id) {
  //   dispatch(toggleTodo(id));
  // }

  return (
    <ul>
      {todos.length > 0 ? (
        todos.map((item) => (
          // eslint-disable-next-line
          <li
            className={item.todo ? "" : "done"}
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
  const { list, filter } = state;
  const todos = list.filter((item) => {
    if (filter === "all") {
      return true;
    } else if (filter === "todo") {
      return item.todo;
    } else if (filter === "done") {
      return !item.todo;
    }
  });
  return { todos };
};

export default connect(mapStateToProps, { toggleTodo })(TodoList);
