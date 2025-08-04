import { useEffect } from "react";
import { getTodos } from "./apis/todoApi";

function App() {
  //js

  useEffect(() => {
    getTodos();
  }, []);
  //jsx
  return <div>App</div>;
}

export default App;
