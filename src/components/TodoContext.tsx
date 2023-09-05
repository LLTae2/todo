import React, { createContext, useContext, useState } from "react";

interface TodoItem {
  content: string;
  isComplete: boolean;
}

interface TodoContextProps {
  todoList: TodoItem[];
  addTodo: (item: TodoItem) => void;
  deleteTodo: (index: number) => void;
  toggleTodo: (item: TodoItem) => void;
  clearTodoList: () => void;
}

interface MyComponentProps {
  children?: React.ReactNode;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

export const TodoProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const addTodo = (item: TodoItem) => {
    setTodoList([...todoList, item]);
  };

  const deleteTodo = (index: number) => {
    const updatedList = [...todoList];
    updatedList.splice(index, 1);
    setTodoList(updatedList);
  };

  const toggleTodo = (item: TodoItem) => {
    const updatedList = todoList.map((todo) => {
      if (todo === item) {
        return { ...todo, isComplete: !todo.isComplete };
      }
      return todo;
    });
    setTodoList(updatedList);
  };

  const clearTodoList = () => {
    setTodoList([]);
  };

  return (
    <TodoContext.Provider
      value={{
        todoList,
        addTodo,
        deleteTodo,
        toggleTodo,
        clearTodoList,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
