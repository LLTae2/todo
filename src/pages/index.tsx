import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import HistoryItem from "../components/HistoryItem";
import TodoItem from "@/components/TodoItem";

interface TodoIte {
  content: string;
  isComplete: boolean;
}

interface HistoryEntry {
  message: string;
  data: TodoIte[];
}

export default function Home() {
  // Todo 아이템 목록을 상태로 관리합니다.
  const [list, setList] = useState<TodoItem[]>([]);

  // 히스토리 목록을 상태로 관리합니다.
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const { register, handleSubmit, reset } = useForm<{ newItem: string }>();

  // Todo 아이템을 생성하는 함수
  const handleCreateItem: SubmitHandler<{ newItem: string }> = (data) => {
    if (!!data.newItem) {
      const newItem = { content: data.newItem, isComplete: false };
      const updatedList = [...list, newItem];

      // Todo 아이템 목록 업데이트
      setList(updatedList);

      // 히스토리 엔트리 추가
      addToHistory(`아이템 "${data.newItem}"을(를) 생성했습니다.`, updatedList);

      // 입력값 초기화
      reset();
    }
  };

  const handleDeleteItem = (index: number) => {
    if (list[index]) {
      const deletedItem = list[index].content;
      const updatedList = [...list];
      updatedList.splice(index, 1);
      setList(updatedList);

      // 히스토리에 삭제 작업을 추가합니다.
      addToHistory(`아이템 "${deletedItem}"을(를) 삭제했습니다.`, updatedList);
    }
  };

  // 히스토리 엔트리를 추가하는 함수
  const addToHistory = (message: string, data: TodoItem[]) => {
    const newHistoryEntry: HistoryEntry = {
      message,
      data,
    };

    // 히스토리 목록 업데이트
    setHistory((prevHistory) => [newHistoryEntry, ...prevHistory]);
  };

  // 나머지 코드 (삭제, 완료 여부 토글 등) 생략

  return (
    <div className="container">
      <div className="flex-container">
        <div className="flex-item">
          <form onSubmit={handleSubmit(handleCreateItem)}>
            <input {...register("newItem")} />
            <button type="submit">만들기</button>
            <button
              onClick={() => {
                setList([]);
                addToHistory("모든 아이템을 삭제했습니다.", []);
              }}
            >
              모두 삭제
            </button>
          </form>
          <div>
            {list.map((data, idx) => (
              // eslint-disable-next-line react/jsx-key
              <TodoItem item={data} onDelete={() => handleDeleteItem(idx)} />
            ))}
          </div>
        </div>
        <div className="flex-item">
          <div className="history">
            <h2>히스토리</h2>
            {history.map((entry, index) => (
              <HistoryItem
                key={index}
                message={entry.message}
                data={entry.data}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
