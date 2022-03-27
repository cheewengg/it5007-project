import "../css/styles.css";

import React from "react";
import RangeSelector from "./RangeSelector.jsx";

const ChartHeader = ({ rangeMap, config, chartTitle }) => {
  return (
    <div className="section__chartHeader">
      <RangeSelector rangeMap={rangeMap} config={config} />
      <div>{chartTitle}</div>
    </div>
  );
};

export default ChartHeader;
