import React, { useState } from "react";

function SymptomForm({ onResult }) {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) return alert("Please enter your symptoms.");

    setIsLoading(true);

    try {
      const resp = await fetch("http://127.0.0.1:8000/api/symptom-checker/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms, age, gender, duration, severity }),
      });
      const data = await resp.json();
      onResult(data);

      // Save to history
      // Save both input + result to history
    const history = JSON.parse(localStorage.getItem("symptom_history") || "[]");
    history.unshift({
    input: { symptoms, age, gender, duration, severity },
    result: data,
    });
    if (history.length > 20) history.pop();
    localStorage.setItem("symptom_history", JSON.stringify(history));


      // Reset form
      setSymptoms("");
      setAge("");
      setGender("");
      setDuration("");
      setSeverity("");
    } catch (err) {
      alert("Failed to analyze symptoms");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="form">
        <div className="symp">
          <label>Symptoms *</label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows="4"
            placeholder="Describe your symptoms..."
            className="txt"
          />
        </div>

        <div className="grid-2">
          <div>
            <label>Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              min="0"
              max="120"
            />
          </div>
          <div>
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label>Duration</label>
            <select value={duration} onChange={(e) => setDuration(e.target.value)}>
              <option value="">How long?</option>
              <option value="hours">A few hours</option>
              <option value="1-2-days">1-2 days</option>
              <option value="3-7-days">3-7 days</option>
              <option value="1-2-weeks">1-2 weeks</option>
              <option value="weeks">Several weeks</option>
            </select>
          </div>
          <div>
            <label>Severity</label>
            <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
              <option value="">Severity</option>
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading && <span className="spinner"></span>}
          {isLoading ? "Analyzing..." : "Analyze Symptoms"}
        </button>
      </form>
    </div>
  );
}

export default SymptomForm;
