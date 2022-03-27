import "../css/general.css";
import "../css/styles.css";

import React, { useEffect, useState } from "react";

import TableUtil from "./TableUtil.jsx";
import Table from "./Table.jsx";

import { getTableData } from "../misc/search.jsx";

const TableData = ({ tableData, setTableData, searchDataConfig }) => {
  const [queryEventName, setQueryEventName] = useState("");
  const [queryTicker, setQueryTicker] = useState("");
  const [queryCreator, setQueryCreator] = useState("");
  const [exportData, setExportData] = useState(new Set());

  const queryConfig = {
    queryEventName,
    setQueryEventName,
    queryTicker,
    setQueryTicker,
    queryCreator,
    setQueryCreator,
  };

  useEffect(async () => {
    const data = await getTableData(queryEventName, queryTicker, queryCreator);
    setTableData(data);
  }, [queryEventName, queryTicker, queryCreator]);

  // const stringJSON = JSON.stringify([...exportData]);
  // console.log(exportData);
  // console.log((stringJSON.length * 2) / 1024 / 1024);

  return (
    <div>
      <TableUtil exportData={exportData} queryConfig={queryConfig} />
      <Table
        tableData={tableData}
        setTableData={setTableData}
        exportData={exportData}
        setExportData={setExportData}
        searchDataConfig={searchDataConfig}
        queryConfig={queryConfig}
      />
    </div>
  );
};

export default TableData;
