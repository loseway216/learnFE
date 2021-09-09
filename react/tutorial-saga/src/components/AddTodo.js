import { useState } from "react";
import { useDispatch, connect } from "react-redux";
import addTodo from "../redux/actionCreators/addTodo";
import addTodoAsync from "../redux/actionCreators/addTodoAsync";

const AddTodo = ({ addTodo, addTodoAsync }) => {
  const [input, setInput] = useState("代办-1");

  // const dispatch = useDispatch();

  // function handleAddTodo() {
  //   dispatch(addTodo(input));
  // }

  return (
    <div>
      <input onChange={(e) => setInput(e.target.value)} value={input}></input>
      <button onClick={() => addTodo(input)}>Add todo</button>
      <button onClick={() => addTodoAsync(input)}>Add todo Async</button>
    </div>
  );
};

export default connect(null, { addTodo, addTodoAsync })(AddTodo);
