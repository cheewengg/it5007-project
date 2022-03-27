import "../css/styles.css";

import React from "react";
import { saveAs } from "file-saver";

import AllFilters from "./AllFilters.jsx";

import { tableHeader as header } from "../misc/config.jsx";

const TableUtil = ({ exportData, queryConfig }) => {
  const generateCSV = (exportData) => {
    const exportDataJSON = [...exportData].map((dataString) =>
      JSON.parse(dataString)
    );
    const headerKeys = Object.keys(header);
    const replacer = (_, value) => {
      return value === null ? "" : value;
    };
    const exportDataCSV = exportDataJSON.map((rowData) => {
      return headerKeys
        .map((key) => {
          return JSON.stringify(rowData[key], replacer);
        })
        .join(",");
    });

    exportDataCSV.unshift(headerKeys.join(","));
    return exportDataCSV.join("\r\n");
  };

  const handleExport = (exportData) => {
    if (exportData.size === 0) return;

    const csv = generateCSV(exportData);
    const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(csvData, "data.csv");
  };

  return (
    <div className="section__tableUtil">
      <AllFilters queryConfig={queryConfig} />
      <button
        className="btn__exportCSV"
        onClick={() => handleExport(exportData)}
      >
        Export to csv
      </button>
    </div>
  );
};

export default TableUtil;
