import React, { useState, useEffect } from 'react';
import SpreadsheetGrid from './components/SpreadsheetGrid';
import SummaryTable from './components/SummaryTable';
import { checklistData } from './data/checklistData';

function App() {
  // State to hold compliance statuses
  // Key: row id (e.g. "2.1.1.1"), Value: string (e.g. "Fully Complied")
  const [statuses, setStatuses] = useState({});
  const [sectionScores, setSectionScores] = useState({});

  const setStatus = (rowId, newStatus) => {
    setStatuses(prev => ({
      ...prev,
      [rowId]: newStatus
    }));
  };

  // Helper to calculate row score based on status
  const calculateRowScore = (status) => {
    return status === "Fully Complied" ? 10 : (status === "Partially Complied" ? 5 : 0);
  };

  // Recalculate section scores whenever statuses change
  useEffect(() => {
    const newSectionScores = {};
    checklistData.forEach(section => {
      let subScore = 0;
      section.rows.forEach(row => {
        subScore += calculateRowScore(statuses[row.id]);
      });
      newSectionScores[section.id] = subScore;
    });
    setSectionScores(newSectionScores);
  }, [statuses]);

  return (
    <div className="app-container">
      <SpreadsheetGrid statuses={statuses} setStatus={setStatus} selectedCategory="All" />
      <SummaryTable scores={sectionScores} />
    </div>
  );
}

export default App;
