import "../css/styles.css";

import React from "react";
import TableHeader from "./TableHeader.jsx";
import TableRow from "./TableRow.jsx";

const Table = ({
  tableData,
  setTableData,
  exportData,
  setExportData,
  searchDataConfig,
  queryConfig,
}) => {
  const modifyExportData = (newData) => {
    return (currentStatus) => {
      const updatedExportData = new Set(exportData);
      newData.forEach((data) => {
        const dataString = JSON.stringify(data);
        if (!currentStatus) updatedExportData.add(dataString);
        else updatedExportData.delete(dataString);
      });

      setExportData(updatedExportData);
    };
  };

  const setCheckStatusMaster = () => {
    return (
      tableData.length !== 0 &&
      tableData.every((data) => {
        const dataString = JSON.stringify(data);
        return exportData.has(dataString);
      })
    );
  };

  const setCheckStatusDefault = (rowData) => {
    const rowDataString = JSON.stringify(rowData);
    return exportData.has(rowDataString);
  };

  const renderTableContent = (tableData) => {
    return tableData.map((rowData) => (
      <TableRow
        key={JSON.stringify(rowData)}
        rowData={rowData}
        setCheckStatus={setCheckStatusDefault}
        modifyExportData={modifyExportData}
        searchDataConfig={searchDataConfig}
        queryConfig={queryConfig}
      />
    ));
  };

  return (
    <div className="section__dataTable">
      <TableHeader
        tableData={tableData}
        setTableData={setTableData}
        setCheckStatus={setCheckStatusMaster}
        modifyExportData={modifyExportData}
      />
      {tableData.length > 0 ? renderTableContent(tableData) : null}
    </div>
  );
};

export default Table;
