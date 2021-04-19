export default function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO": {
      const { content, id } = action.payload;
      // return state;
      return [...state, { id, content, todo: true }];
    }
    case "TOGGLE_TODO": {
      const { id } = action.payload;
      state.forEach((item) => {
        if (item.id === id) {
          item.todo = !item.todo;
        }
      });
      return [...state];
    }
    default:
      return state;
  }
}
