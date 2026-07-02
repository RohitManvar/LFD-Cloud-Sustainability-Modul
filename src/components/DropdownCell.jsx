import React from 'react';

const DropdownCell = ({ value, onChange }) => {
  // Determine color class based on value
  let statusClass = "";
  if (value === "Fully Complied") statusClass = "status-yes";
  else if (value === "Partially Complied") statusClass = "status-partial";
  else if (value === "Not Complied") statusClass = "status-no";
  else if (value === "Not Applicable") statusClass = "status-na";

  return (
    <select 
      className={`select-input ${statusClass}`} 
      value={value || ""} 
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>Select Status</option>
      <option value="Fully Complied">Fully Complied</option>
      <option value="Partially Complied">Partially Complied</option>
      <option value="Not Complied">Not Complied</option>
      <option value="Not Applicable">Not Applicable</option>
    </select>
  );
};

export default DropdownCell;
