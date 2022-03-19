import React, { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import PrimaryHeader from "./PrimaryHeader.jsx";
import DateRange from "./DateRange.jsx";
import PrimaryChart from "./PrimaryChart.jsx";
import LookBackRange from "./LookBackRange.jsx";
import SecondaryChart from "./SecondaryChart.jsx";

import usePrimaryData from "../hooks/usePrimaryData.jsx";
import useSecondaryData from "../hooks/useSecondaryData.jsx";
import { generatePrimaryHeaderData } from "../misc/util.jsx";

const Main = () => {
  const [primaryData, searchPrimaryData] = usePrimaryData("000070 KS Equity");
  const [secondaryData, searchSecondaryData] =
    useSecondaryData("000070 KS Equity");
  const [dateRange, setDateRange] = useState(100000);
  const [lookBackRange, setLookBackRange] = useState(90);

  const { ticker, primaryChartData } = primaryData;
  const primaryHeaderData = generatePrimaryHeaderData(primaryData);

  const { secondaryChartData } = secondaryData;

  return (
    <div>
      <SearchBar
        currentDateRange={dateRange}
        currentLookBackRange={lookBackRange}
        searchPrimaryData={searchPrimaryData}
        searchSecondaryData={searchSecondaryData}
      />
      <PrimaryHeader primaryHeaderData={primaryHeaderData} />
      <DateRange
        currentTicker={ticker}
        currentDateRange={dateRange}
        currentLookBackRange={lookBackRange}
        setDateRange={setDateRange}
        searchPrimaryData={searchPrimaryData}
        searchSecondaryData={searchSecondaryData}
      />
      <PrimaryChart
        primaryHeaderData={primaryHeaderData}
        primaryChartData={primaryChartData}
      />
      <LookBackRange
        currentTicker={ticker}
        currentDateRange={dateRange}
        currentLookBackRange={lookBackRange}
        setLookBackRange={setLookBackRange}
        searchSecondaryData={searchSecondaryData}
      />
      <SecondaryChart secondaryChartData={secondaryChartData} />
    </div>
  );
};

export default Main;
