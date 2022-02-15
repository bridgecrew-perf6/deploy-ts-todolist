import React from "react";
import { ITodo } from "../types/data";
import TodoItem from "./TodoItem";

interface ITodoLIstProps {
  items: ITodo[];
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const TodoList: React.FC<ITodoLIstProps> = (props) => {
  const { items, removeTodo, toggleTodo } = props;
  return (
    <div className="items">
      {items.map((todo) => (
        <TodoItem
          key={todo.id}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          {...todo}
        />
      ))}
    </div>
  );
};

export default TodoList;
