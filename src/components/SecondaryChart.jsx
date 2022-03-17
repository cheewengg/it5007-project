import React from "react";
import { Chart } from "react-google-charts";
import { generateSecondaryChartOptions } from "../misc/config.jsx";

const SecondaryChart = ({ secondaryChartData }) => {
  const config = {
    darkTheme: false,
  };

  return (
    <Chart
      chartType="LineChart"
      data={!secondaryChartData ? [] : secondaryChartData}
      options={generateSecondaryChartOptions(config)}
    />
  );
};

export default SecondaryChart;
