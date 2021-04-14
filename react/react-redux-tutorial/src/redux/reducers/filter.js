export default function filter(state = "all", action) {
  switch (action.type) {
    case "SET_FILTER": {
      const { filter } = action.payload;
      return filter;
    }
    default:
      return state;
  }
}
