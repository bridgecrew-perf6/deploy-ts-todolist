import React from "react";
import "./App.css";
import TodoList from "./TodoList";
import { ITodo } from "../types/data";

const App: React.FC = () => {
  const [value, setValue] = React.useState("");
  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addTodo = () => {
    if (value) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: value,
          complete: false,
        },
      ]);
      setValue("");
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") addTodo();
  };

  const removeTodo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number): void => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          complete: !todo.complete,
        };
      })
    );
  };
  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);
  return (
    <div className="container">
      <div className="todo__header">
        <h4>Список задач</h4>
      </div>
      <div className="containerHeader">
        <input
          type="text"
          className="inputBlock"
          value={value}
          onChange={handleChange}
          onKeyDown={handleOnKeyDown}
          ref={inputRef}
          placeholder="Введите текст задачи..."
        />
        <button onClick={addTodo} className="btnBlock">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.875 7.875H10.125V1.125C10.125 0.826631 10.0065 0.540484 9.79549 0.329505C9.58452 0.118527 9.29837 0 9 0C8.70163 0 8.41548 0.118527 8.20451 0.329505C7.99353 0.540484 7.875 0.826631 7.875 1.125V7.875H1.125C0.826631 7.875 0.540484 7.99353 0.329505 8.20451C0.118527 8.41548 0 8.70163 0 9C0 9.29837 0.118527 9.58452 0.329505 9.79549C0.540484 10.0065 0.826631 10.125 1.125 10.125H7.875V16.875C7.875 17.1734 7.99353 17.4595 8.20451 17.6705C8.41548 17.8815 8.70163 18 9 18C9.29837 18 9.58452 17.8815 9.79549 17.6705C10.0065 17.4595 10.125 17.1734 10.125 16.875V10.125H16.875C17.1734 10.125 17.4595 10.0065 17.6705 9.79549C17.8815 9.58452 18 9.29837 18 9C18 8.70163 17.8815 8.41548 17.6705 8.20451C17.4595 7.99353 17.1734 7.875 16.875 7.875Z"
              fill="#C7C7C7"
            />
          </svg>
        </button>
      </div>
      <TodoList items={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
    </div>
  );
};

export default App;
