import { useState } from "react";
import { useDispatch, connect } from "react-redux";
import addTodo from "../redux/actionCreators/addTodo";

const AddTodo = ({ addTodo }) => {
  const [input, setInput] = useState("代办-1");

  // const dispatch = useDispatch();

  // function handleAddTodo() {
  //   dispatch(addTodo(input));
  // }

  return (
    <div>
      <input onChange={(e) => setInput(e.target.value)} value={input}></input>
      <button onClick={() => addTodo(input)}>Add todo</button>
    </div>
  );
};

export default connect(null, { addTodo })(AddTodo);
