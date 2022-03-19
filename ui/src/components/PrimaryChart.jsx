import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { generatePrimaryChartOptions } from "../misc/config.jsx";

const PrimaryChart = ({ primaryHeaderData, primaryChartData }) => {
  const { differenceAbs } = primaryHeaderData;

  const config = {
    darkTheme: false,
    upslope: differenceAbs > 0,
  };

  return (
    <Chart
      chartType="AreaChart"
      data={!primaryChartData ? [] : primaryChartData}
      options={generatePrimaryChartOptions(config)}
    />
  );
};

export default PrimaryChart;
