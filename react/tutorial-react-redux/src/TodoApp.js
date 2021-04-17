import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import VisibilityFilter from "./components/VisibilityFilter";

const TodoApp = () => {
  return (
    <div>
      <h1>Todo List App with React-Redux</h1>
      <AddTodo />
      <TodoList />
      <VisibilityFilter />
    </div>
  );
};

export default TodoApp;
