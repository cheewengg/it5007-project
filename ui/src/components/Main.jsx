import React, { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import PrimaryHeader from "./PrimaryHeader.jsx";
import RangeSelector from "./RangeSelector.jsx";
import StockChart from "./StockChart.jsx";

import useQuery from "../hooks/useQuery.jsx";

import {
  searchPrimaryDataConfig,
  searchSecondaryDataPxConfig,
  searchSecondaryDataVolConfig,
} from "../misc/search.jsx";

import {
  dateRangeMap,
  lookBackRangePxMap,
  lookBackRangeVolMap,
  generatePrimaryHeaderData,
  primaryChartOptions,
  secondaryChartOptions,
} from "../misc/util.jsx";

const Main = () => {
  const [primaryData, searchPrimaryData] = useQuery(
    "000070 KS Equity",
    searchPrimaryDataConfig
  );
  const [secondaryDataPx, searchSecondaryDataPx] = useQuery(
    "000070 KS Equity",
    searchSecondaryDataPxConfig
  );
  const [secondaryDataVol, searchSecondaryDataVol] = useQuery(
    "000070 KS Equity",
    searchSecondaryDataVolConfig
  );

  const [dateRange, setDateRange] = useState(100000);
  const [lookBackRangePx, setLookBackRangePx] = useState(90);
  const [lookBackRangeVol, setLookBackRangeVol] = useState(1);

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

  const searchData = { searchPrimaryData, searchSecondaryDataPx };

  const primaryHeaderData = generatePrimaryHeaderData(primaryData);

  return (
    <div>
      <SearchBar
        currentDateRange={dateRange}
        currentLookBackRangePx={lookBackRangePx}
        searchData={searchData}
      />
      <PrimaryHeader primaryHeaderData={primaryHeaderData} />
      <RangeSelector rangeMap={dateRangeMap} config={dateRangeConfig} />
      <StockChart
        chartType="LineChart"
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
        options={secondaryChartOptions}
      />
      <RangeSelector
        rangeMap={lookBackRangeVolMap}
        config={lookBackRangeVolConfig}
      />
      <StockChart
        chartType="LineChart"
        chartData={secondaryChartDataVol}
        options={secondaryChartOptions}
      />
    </div>
  );
};

export default Main;
