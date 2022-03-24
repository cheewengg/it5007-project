import "../css/general.css";
import "../css/styles.css";

import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar.jsx";
import PrimaryHeader from "./PrimaryHeader.jsx";
import RangeSelector from "./RangeSelector.jsx";
import StockChart from "./StockChart.jsx";
import DataTable from "./DataTable.jsx";

import useQuery from "../hooks/useQuery.jsx";

import { getTableData } from "../misc/search.jsx";
import { generatePrimaryHeaderData } from "../misc/util.jsx";

import {
  DEFAULT_QUERY,
  dateRangeMap,
  lookBackRangePxMap,
  lookBackRangeVolMap,
  searchPrimaryDataConfig,
  searchSecondaryDataPxConfig,
  searchSecondaryDataVolConfig,
  primaryChartOptions,
  secondaryChartPxOptions,
  secondaryChartVolOptions,
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

  const handleSearchDateRange = (
    ticker,
    primaryRange,
    secondaryRange1,
    secondaryRange2
  ) => {
    searchPrimaryData(ticker, primaryRange);
    searchSecondaryDataPx(ticker, primaryRange, secondaryRange1);
    searchSecondaryDataVol(ticker, primaryRange, secondaryRange2);
  };

  const handleSearchLookBackRangePx = (
    ticker,
    primaryRange,
    secondaryRange1,
    secondaryRange2
  ) => {
    searchSecondaryDataPx(ticker, secondaryRange1, primaryRange);
  };

  const handleSearchLookBackRangeVol = (
    ticker,
    primaryRange,
    secondaryRange1,
    secondaryRange2
  ) => {
    searchSecondaryDataVol(ticker, secondaryRange1, primaryRange);
  };

  const dateRangeConfig = {
    currentTicker: ticker,
    primaryRange: dateRange,
    secondaryRange1: lookBackRangePx,
    secondaryRange2: lookBackRangeVol,
    setPrimaryRange: setDateRange,
    searchData: handleSearchDateRange,
  };

  const lookBackRangePxConfig = {
    currentTicker: ticker,
    primaryRange: lookBackRangePx,
    secondaryRange1: dateRange,
    secondaryRange2: lookBackRangeVol,
    setPrimaryRange: setLookBackRangePx,
    searchData: handleSearchLookBackRangePx,
  };

  const lookBackRangeVolConfig = {
    currentTicker: ticker,
    primaryRange: lookBackRangeVol,
    secondaryRange1: dateRange,
    secondaryRange2: lookBackRangePx,
    setPrimaryRange: setLookBackRangeVol,
    searchData: handleSearchLookBackRangeVol,
  };

  const searchData = {
    searchPrimaryData,
    searchSecondaryDataPx,
    searchSecondaryDataVol,
  };

  const primaryHeaderData = generatePrimaryHeaderData(primaryData);

  return (
    <div>
      <SearchBar
        currentDateRange={dateRange}
        currentLookBackRangePx={lookBackRangePx}
        currentLookBackRangeVol={lookBackRangeVol}
        searchData={searchData}
      />
      <PrimaryHeader primaryHeaderData={primaryHeaderData} />
      <RangeSelector rangeMap={dateRangeMap} config={dateRangeConfig} />
      <StockChart
        chartType="ComboChart"
        chartData={primaryChartData}
        options={primaryChartOptions}
      />
      <RangeSelector
        rangeMap={lookBackRangePxMap}
        config={lookBackRangePxConfig}
      />
      <StockChart
        chartType="LineChart"
        chartData={secondaryChartDataPx}
        options={secondaryChartPxOptions}
      />
      <RangeSelector
        rangeMap={lookBackRangeVolMap}
        config={lookBackRangeVolConfig}
      />
      <StockChart
        chartType="ComboChart"
        chartData={secondaryChartDataVol}
        options={secondaryChartVolOptions}
      />
      <DataTable tableData={tableData} setTableData={setTableData} />
    </div>
  );
};

export default Main;
