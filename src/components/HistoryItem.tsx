import React, { useState } from "react";

export interface HistoryEntry {
  message: string;
  data: TodoItem[];
}

interface TodoItem {
  content: string;
  isComplete: boolean;
}

const HistoryItem: React.FC<HistoryEntry> = ({ message, data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="history-box">
      <div className="history-action">
        {message}
        <button onClick={toggleExpansion}>
          {isExpanded ? "데이터 감추기" : "데이터 보기"}
        </button>
      </div>
      {isExpanded && (
        <div className="history-items">
          {data.map((item, index) => (
            <div key={index} className="history-item">
              {item.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryItem;
