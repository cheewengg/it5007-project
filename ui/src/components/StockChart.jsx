import React from "react";
import { Chart } from "react-google-charts";

const StockChart = ({ chartType, chartData, options }) => {
  return (
    <Chart
      chartType={chartType}
      data={!chartData ? [] : chartData}
      options={options}
    />
  );
};

export default StockChart;
