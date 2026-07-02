import React from 'react';
import { checklistData } from '../data/checklistData';
import DropdownCell from './DropdownCell';

const SpreadsheetGrid = ({ statuses, setStatus, selectedCategory }) => {
  const handleStatusChange = (rowId, newStatus) => {
    setStatus(rowId, newStatus);
  };

  // Helper to calculate row score based on status
  // Assuming "Fully Complied" gives 10 point, "Partially Complied" gives 5.
  const calculateRowScore = (status) => {
    return status === "Fully Complied" ? 10 : (status === "Partially Complied" ? 5 : 0);
  };

  // Render rows for a given section
  const renderSection = (section, sectionIndex) => {
    const isBlue = sectionIndex % 2 === 0;
    const headerClass = isBlue ? "section-header-blue" : "section-header-yellow";
    
    // Calculate subscore
    const subScore = section.rows.reduce((acc, row) => {
      return acc + calculateRowScore(statuses[row.id]);
    }, 0);

    return (
      <React.Fragment key={section.id}>
        {/* Section Header Row */}
        <tr>
          <td colSpan="8" className={headerClass}>
            {section.title}
          </td>
        </tr>
        
        {/* Section Data Rows */}
        {section.rows.map((row) => {
          const rowScore = calculateRowScore(statuses[row.id]);
          return (
            <tr key={row.id} className="hover:bg-slate-50 transition-colors duration-150">
              <td className="col-sno">{row.sNo}</td>
              <td className="col-req">{row.requirement}</td>
              <td className="col-ref">{row.reference}</td>
              <td className="col-req-type">{row.requirementType}</td>
              <td className="col-action">{row.actionRequirement}</td>
              <td className="col-clause">{row.clause}</td>
              <td className="col-status">
                <DropdownCell 
                  value={statuses[row.id]} 
                  onChange={(newStatus) => handleStatusChange(row.id, newStatus)}
                />
              </td>
              <td className="col-score">
                {statuses[row.id] ? rowScore : ''}
              </td>
            </tr>
          );
        })}

        {/* Subscore Row */}
        <tr style={{ backgroundColor: '#f8fafc' }}>
          <td colSpan="7" style={{ textAlign: 'right', fontWeight: 600 }}>
            Sub Score:
          </td>
          <td className="col-score">{subScore}</td>
        </tr>
      </React.Fragment>
    );
  };

  // Calculate total score
  let totalScore = 0;
  checklistData.forEach(section => {
    section.rows.forEach(row => {
      totalScore += calculateRowScore(statuses[row.id]);
    });
  });

  return (
    <div className="spreadsheet-wrapper">
      <div className="scroll-hint">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        Swipe or scroll horizontally to view all columns
      </div>
      <table>
        <thead>
          {/* Main Title */}
          <tr>
            <th colSpan="8" className="header-main text-lg py-3 text-center">
              Sustainable Factory Planning Master Checklist
              <div className="text-sm font-normal text-blue-200 mt-1">
                Comprehensive Evaluation for Sections 1-6
              </div>
            </th>
          </tr>
          {/* Column Headers */}
          <tr className="header-sub">
            <th className="col-sno">S.No</th>
            <th className="col-req">Requirement</th>
            <th className="col-ref">Reference</th>
            <th className="col-req-type">Requirement Type as per ...</th>
            <th className="col-action">Action Requirement</th>
            <th className="col-clause">Clause/ Ref in IGBC</th>
            <th className="col-status">Compliance Status</th>
            <th className="col-score">Score</th>
          </tr>
        </thead>
        <tbody>
          {checklistData
            .filter(section => selectedCategory === 'All' || section.id.startsWith(selectedCategory + '.'))
            .map((section, index) => renderSection(section, index))}
          {/* Total Score Row */}
          <tr className="header-sub">
            <td colSpan="7" style={{ textAlign: 'right', fontWeight: 'bold' }}>
              Total Score:
            </td>
            <td className="col-score" style={{ fontWeight: 'bold', fontSize: '16px' }}>
              {totalScore}
            </td>
          </tr>
          {/* Notes */}
          <tr>
            <td colSpan="8" className="notes-section">
              <b>Notes:</b>
              <ul>
                <li>Mandatory action items are required by the Public Policy rules, they are inherently to be evaluated first.</li>
                <li>Recommended provisions are those which are provided over and above minimum requirements.</li>
                <li>Check the sub-components that are marked mandatory. For the sub-components which are not evaluated, mark 'Not Applicable'.</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SpreadsheetGrid;
