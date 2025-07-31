import { useRecoilState } from "recoil";
import { todoListAtom } from "../atoms/TodoListAtom";
import { useState } from "react";
import { LoginAtom } from "../atoms/LoginAtom";

function TodoList() {
  const [isLogin, setIsLogin] = useRecoilState(LoginAtom);
  const [todo, setTodo] = useRecoilState(todoListAtom);
  const [text, setText] = useState("");

  const add = () => {
    if (text !== "") {
      //atom 의 데이터를 업데이트함.
      setTodo([...todo, { id: new Date(), title: text, completed: false }]);
      setText("");
    }
  };

  const deleteTodo = _item => {
    // 전달받은 todo 의 id 를 비교해서 id 값이 다른 것만 별도로 뽑겠다.
    // 남는 것은 id 가 다른 것들만 남는다.
    const arr = todo.filter(item => item.id !== _item.id);
    setTodo(arr);
  };

  const toggleTodo = _item => {
    //item.completed === true ==>false
    //item.completed === false ==>true
    // if 문
    const arr = todo.map(item => {
      if (item.id === _item.id) {
        return { ...item, completed: !item.completed };
      } else {
        return item;
      }
    });

    // 3항
    // const arr = todo.map(item =>
    //   item.id === _item.id ? { ...item, completed: !item.completed } : item,
    // );
    setTodo(arr);
  };

  return (
    <div>
      <h3>
        Todo List 기능
        <button onClick={setIsLogin(true)}>로그인</button>
      </h3>
      <div>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button onClick={add}>추가</button>
      </div>
      <div>
        <h4>할일 목록</h4>
        <ul>
          {todo.map(item => (
            <li key={item.id}>
              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
                onClick={() => toggleTodo(item)}
              >
                {item.title}
              </span>
              <button onClick={() => deleteTodo(item)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
