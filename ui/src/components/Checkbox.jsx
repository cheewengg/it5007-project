import "../css/styles.css";

import React from "react";

const Checkbox = ({ predefinedClassName, checkStatus, modifyExportData }) => {
  return (
    <div className={predefinedClassName}>
      <input
        type="checkbox"
        onChange={() => modifyExportData(checkStatus)}
        defaultChecked={checkStatus}
      />
    </div>
  );
};

export default Checkbox;
