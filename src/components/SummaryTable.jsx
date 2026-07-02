import React from 'react';
import { summaryData } from '../data/checklistData';

const SummaryTable = ({ scores }) => {
  const totalPoints = summaryData.reduce((acc, curr) => acc + curr.pts, 0);
  
  // Calculate user total points
  const userTotal = summaryData.reduce((acc, item) => {
    return acc + (scores[item.section] || 0);
  }, 0);

  return (
    <div className="summary-wrapper">
      <div className="summary-header">
        Section-wise Evaluation Summary
      </div>
      <table>
        <thead>
          <tr className="header-sub">
            <th style={{ width: '40%' }}>SECTION</th>
            <th style={{ width: '30%', textAlign: 'center' }}>PTS</th>
            <th style={{ width: '30%', textAlign: 'center' }}>SCORE</th>
          </tr>
        </thead>
        <tbody>
          {summaryData.map(item => (
            <tr key={item.section}>
              <td>{item.section}</td>
              <td style={{ textAlign: 'center' }}>{item.pts}</td>
              <td style={{ textAlign: 'center', fontWeight: '600' }}>
                {scores[item.section] || 0}
              </td>
            </tr>
          ))}
          <tr className="summary-total-row">
            <td style={{ textAlign: 'right' }}>Totals:</td>
            <td style={{ textAlign: 'center' }}>{totalPoints}</td>
            <td style={{ textAlign: 'center' }}>{userTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
