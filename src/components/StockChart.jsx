import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { generateOptions } from "../misc/config.jsx";

const StockChart = ({ displayTitle, displayData }) => {
  const checkUpslope = () => {
    if (displayData.length === 0) return false;

    const leftBound = displayData[1][1];
    const rightBound = displayData[displayData.length - 1][1];

    return rightBound - leftBound > 0;
  };

  const config = {
    title: displayTitle,
    darkTheme: false,
    upslope: checkUpslope(),
  };

  return (
    <Chart
      chartType="AreaChart"
      width="100%"
      height="400px"
      data={displayData}
      options={generateOptions(config)}
    />
  );
};

export default StockChart