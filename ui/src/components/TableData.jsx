import "../css/general.css";
import "../css/styles.css";

import React, { useEffect, useState } from "react";
import AllFilters from "./AllFilters.jsx";
import Table from "./Table.jsx";

import { getTableData } from "../misc/search.jsx";

const TableData = ({ tableData, setTableData, searchDataConfig }) => {
  const [queryEventName, setQueryEventName] = useState("");
  const [queryTicker, setQueryTicker] = useState("");
  const [queryCreator, setQueryCreator] = useState("");

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

  return (
    <div>
      <AllFilters queryConfig={queryConfig} />
      <Table
        tableData={tableData}
        setTableData={setTableData}
        searchDataConfig={searchDataConfig}
        queryConfig={queryConfig}
      />
    </div>
  );
};

export default TableData;
