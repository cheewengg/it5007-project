import "../css/general.css";
import "../css/styles.css";

import React from "react";
import ChartHeader from "./ChartHeader.jsx";
import StockChart from "./StockChart.jsx";

import {
  dateRangeMap,
  lookBackRangePxMap,
  lookBackRangeVolMap,
  primaryChartOptions,
  secondaryChartPxOptions,
  secondaryChartVolOptions,
} from "../misc/config.jsx";

const AllCharts = ({ allChartsConfig }) => {
  const {
    ticker,
    dateRange,
    lookBackRangePx,
    lookBackRangeVol,
    searchPrimaryData,
    searchSecondaryDataPx,
    searchSecondaryDataVol,
    setDateRange,
    setLookBackRangePx,
    setLookBackRangeVol,
    primaryChartData,
    secondaryChartDataPx,
    secondaryChartDataVol,
  } = allChartsConfig;

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

  return (
    <div className="section__allCharts">
      <ChartHeader
        rangeMap={dateRangeMap}
        chartTitle="Close Price/Volume"
        config={dateRangeConfig}
      />
      <StockChart
        chartType="ComboChart"
        chartData={primaryChartData}
        options={primaryChartOptions}
      />
      <ChartHeader
        rangeMap={lookBackRangePxMap}
        chartTitle="Price Spillover (%)"
        config={lookBackRangePxConfig}
      />
      <StockChart
        chartType="LineChart"
        chartData={secondaryChartDataPx}
        options={secondaryChartPxOptions}
      />
      <ChartHeader
        rangeMap={lookBackRangeVolMap}
        chartTitle="Excess Volume (%)"
        config={lookBackRangeVolConfig}
      />
      <StockChart
        chartType="ComboChart"
        chartData={secondaryChartDataVol}
        options={secondaryChartVolOptions}
      />
    </div>
  );
};

export default AllCharts;
