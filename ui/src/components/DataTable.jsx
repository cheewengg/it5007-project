import "../css/general.css";
import "../css/styles.css";

import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar.jsx";
import TableHeader from "./TableHeader.jsx";
import TableRow from "./TableRow.jsx";

import { getTableData } from "../misc/search.jsx";

const DataTable = ({ tableData, setTableData, searchDataConfig }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(async () => {
    const data = await getTableData(searchTerm);
    setTableData(data);
  }, [searchTerm]);

  const renderTableContent = (tableData) => {
    return tableData.map((rowData) => (
      <TableRow
        key={JSON.stringify(rowData)}
        rowData={rowData}
        searchDataConfig={searchDataConfig}
        searchTerm={searchTerm}
      />
    ));
  };

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="section__dataTable">
        <TableHeader tableData={tableData} setTableData={setTableData} />
        {tableData.length > 0 ? renderTableContent(tableData) : null}
      </div>
    </div>
  );
};

export default DataTable;
