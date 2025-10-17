import React, { useState } from "react";
import SymptomForm from "./SymptomForm";
import ResultsDisplay from "./ResultsDisplay";
import QueryHistory from "./QueryHistory";
import "../App.css";

function SymptomChecker() {
  const [result, setResult] = useState(null);

  return (
    <div className="container">
      <h1>Healthcare Symptom Checker</h1>

      <SymptomForm onResult={setResult} />

      {result && <ResultsDisplay result={result} />}

      <h2>Query History</h2>
      <QueryHistory onSelectQuery={setResult} />
    </div>
  );
}

export default SymptomChecker;


// import React, { useState } from 'react';
// import './App.css';

// function SymptomChecker() {
//   const [symptoms, setSymptoms] = useState('');
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError(null);
//     setResult(null);

//     if (!symptoms.trim()) {
//       setError('Please enter symptoms.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const resp = await fetch('http://127.0.0.1:8000/api/symptom-checker/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ symptoms })
//       });

//       if (!resp.ok) throw new Error('API error');
//       const data = await resp.json();
//       setResult(data);
//     } catch (err) {
//       setError(err.message || 'Request failed');
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="container">
//       <h1>Healthcare Symptom Checker</h1>

//       <form onSubmit={handleSubmit} className="form">
//         <label>Describe your symptoms (brief):</label>
//         <textarea
//           value={symptoms}
//           onChange={(e) => setSymptoms(e.target.value)}
//           rows={6}
//           placeholder="e.g., sore throat, fever, mild cough"
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Checking...' : 'Check'}
//         </button>
//       </form>

//       {error && <div className="error">{error}</div>}

//       {result && (
//         <div className="result">
//           <h2>Probable Conditions</h2>
//           <ul>
//             {result.conditions?.map((c, i) => (
//               <li key={i} style={{ marginBottom: '12px' }}>
//                 <strong>{c.name}</strong> — {c.notes}
//                 <div className="condition-bar">
//                   <div
//                     className="condition-bar-fill"
//                     style={{ width: `${c.confidence || 0}%` }}
//                   >
//                     {c.confidence || '—'}%
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           <h2>Recommended Next Steps</h2>
//           <ol>
//             {result.next_steps?.map((s, i) => (
//               <li key={i}>{s}</li>
//             ))}
//           </ol>

//           <h3>Educational Disclaimer</h3>
//           <p>{result.disclaimer}</p>
//         </div>
//       )}

//       <footer className="foot">
//         This tool is for educational purposes only.
//       </footer>
//     </div>
//   );
// }

// export default SymptomChecker;

