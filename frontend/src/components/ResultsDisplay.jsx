import React from "react";

function ResultsDisplay({ result }) {
  return (
    <div className="card result-card">
      <h2>Probable Conditions</h2>
      <ul>
        {result.conditions?.map((c, i) => (
          <li key={i}>
            <strong>{c.name}</strong>: {c.confidence ?? "—"}% — {c.notes}
          </li>
        ))}
      </ul>

      <h2>Recommended Next Steps</h2>
      <ol>
        {result.next_steps?.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>

      <div className="disclaimer">
        <strong>Disclaimer:</strong> {result.disclaimer}
      </div>
    </div>
  );
}

export default ResultsDisplay;
