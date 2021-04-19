export default function addTodoAsync(content) {
  return { type: "ADD_TODO_ASYNC", payload: { content } };
}
