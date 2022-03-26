import "../css/styles.css";

import React from "react";
import TableHeader from "./TableHeader.jsx";
import TableRow from "./TableRow.jsx";

const Table = ({ tableData, setTableData, searchDataConfig, queryConfig }) => {
  const renderTableContent = (tableData) => {
    return tableData.map((rowData) => (
      <TableRow
        key={JSON.stringify(rowData)}
        rowData={rowData}
        searchDataConfig={searchDataConfig}
        queryConfig={queryConfig}
      />
    ));
  };

  return (
    <div className="section__dataTable">
      <TableHeader tableData={tableData} setTableData={setTableData} />
      {tableData.length > 0 ? renderTableContent(tableData) : null}
    </div>
  );
};

export default Table;
