let nextTodoId = 0;

export default function addTodo(content) {
  return { type: "ADD_TODO", payload: { id: nextTodoId++, content } };
}
