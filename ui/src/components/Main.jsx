import "../css/general.css";
import "../css/styles.css";

import React, { useEffect, useState } from "react";
import PrimaryHeader from "./PrimaryHeader.jsx";
import AllCharts from "./AllCharts.jsx";
import DataTable from "./DataTable.jsx";

import useQuery from "../hooks/useQuery.jsx";

import { getTableData } from "../misc/search.jsx";
import { generatePrimaryHeaderData } from "../misc/util.jsx";
import {
  DEFAULT_QUERY,
  searchPrimaryDataConfig,
  searchSecondaryDataPxConfig,
  searchSecondaryDataVolConfig,
} from "../misc/config.jsx";

const Main = () => {
  const [primaryData, searchPrimaryData] = useQuery(
    DEFAULT_QUERY,
    searchPrimaryDataConfig
  );
  const [secondaryDataPx, searchSecondaryDataPx] = useQuery(
    DEFAULT_QUERY,
    searchSecondaryDataPxConfig
  );
  const [secondaryDataVol, searchSecondaryDataVol] = useQuery(
    DEFAULT_QUERY,
    searchSecondaryDataVolConfig
  );

  const [tableData, setTableData] = useState([]);
  const [dateRange, setDateRange] = useState(100000);
  const [lookBackRangePx, setLookBackRangePx] = useState(90);
  const [lookBackRangeVol, setLookBackRangeVol] = useState(1);

  useEffect(async () => {
    const data = await getTableData();
    setTableData(data);
  }, []);

  const { ticker, primaryChartData } = primaryData;
  const { secondaryChartDataPx } = secondaryDataPx;
  const { secondaryChartDataVol } = secondaryDataVol;
  const primaryHeaderData = generatePrimaryHeaderData(primaryData);

  const searchDataConfig = {
    ticker,
    dateRange,
    lookBackRangePx,
    lookBackRangeVol,
    searchPrimaryData,
    searchSecondaryDataPx,
    searchSecondaryDataVol,
  };

  const allChartsConfig = Object.assign(
    { ...searchDataConfig },
    {
      setDateRange,
      setLookBackRangePx,
      setLookBackRangeVol,
      primaryChartData,
      secondaryChartDataPx,
      secondaryChartDataVol,
    }
  );

  return (
    <div>
      <PrimaryHeader primaryHeaderData={primaryHeaderData} />
      <AllCharts allChartsConfig={allChartsConfig} />
      <DataTable
        searchDataConfig={searchDataConfig}
        tableData={tableData}
        setTableData={setTableData}
      />
    </div>
  );
};

export default Main;
