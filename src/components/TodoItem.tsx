import React, { forwardRef, ForwardedRef } from "react";
import { useTodoContext } from "./TodoContext";

interface TodoItem {
  content: string;
  isComplete: boolean;
}

interface TodoItemProps {
  item: TodoItem;
  onDelete: () => void; // onDelete 함수 추가
}

// eslint-disable-next-line react/display-name
const TodoItem = forwardRef(({ item, onDelete }: TodoItemProps) => {
  const { toggleTodo } = useTodoContext();

  return (
    <div className={`todo-item ${item.isComplete ? "completed" : ""}`}>
      <input
        type="checkbox"
        className="checkbox"
        onChange={() => toggleTodo(item)}
      />
      <span className={`${item.isComplete ? "completed" : ""}`}>
        {item.content}
      </span>
      <button className="deletebox" onClick={onDelete}>
        삭제
      </button>
    </div>
  );
});

export default TodoItem;
