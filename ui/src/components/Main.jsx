import "../css/general.css";
import "../css/styles.css";

import React, { useEffect, useState } from "react";
import PrimaryHeader from "./PrimaryHeader.jsx";
import AllCharts from "./AllCharts.jsx";
import TableData from "./TableData.jsx";

import useQuery from "../hooks/useQuery.jsx";

import { getTableData } from "../misc/search.jsx";
import { generatePrimaryHeaderData } from "../misc/util.jsx";
import {
  searchPrimaryDataConfig,
  searchSecondaryDataPxConfig,
  searchSecondaryDataVolConfig,
} from "../misc/config.jsx";

const Main = () => {
  const [primaryData, searchPrimaryData] = useQuery(
    "",
    searchPrimaryDataConfig
  );
  const [secondaryDataPx, searchSecondaryDataPx] = useQuery(
    "",
    searchSecondaryDataPxConfig
  );
  const [secondaryDataVol, searchSecondaryDataVol] = useQuery(
    "",
    searchSecondaryDataVolConfig
  );

  const [tableData, setTableData] = useState([]);
  const [dateRange, setDateRange] = useState(100000);
  const [lookBackRangePx, setLookBackRangePx] = useState(90);
  const [lookBackRangeVol, setLookBackRangeVol] = useState(1);

  useEffect(async () => {
    const data = await getTableData();
    setTableData(data);

    const defaultQuery = data[0].ticker;
    searchPrimaryData(defaultQuery);
    searchSecondaryDataPx(defaultQuery);
    searchSecondaryDataVol(defaultQuery);
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
      <TableData
        searchDataConfig={searchDataConfig}
        tableData={tableData}
        setTableData={setTableData}
      />
    </div>
  );
};

export default Main;
