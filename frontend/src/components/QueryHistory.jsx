import React, { useState, useEffect } from "react";

function QueryHistory({ onSelectQuery }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("symptom_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("symptom_history");
    setHistory([]);
  };

  const deleteQuery = (index) => {
    const updated = [...history];
    updated.splice(index, 1);
    setHistory(updated);
    localStorage.setItem("symptom_history", JSON.stringify(updated));
  };

  if (!history.length) return <p>No previous queries.</p>;

  return (
    <div>
      <button onClick={clearHistory} className="clear">Clear All</button>
      {history.map((q, i) => (
        <div key={i} className="history-card">
            <span>
            {q.input.symptoms.substring(0, 60)}
            {q.input.symptoms.length > 60 ? "..." : ""}
            </span>
            <div>
            <button className="view" onClick={() => onSelectQuery(q.result)}>View</button>
            <button className="delete" onClick={() => deleteQuery(i)}>Delete</button>
            </div>
        </div>
        ))}

    </div>
  );
}

export default QueryHistory;
