import React, { useState, useEffect } from "react";
import { dateRangeMapping } from "../misc/util.jsx";

const DateRange = ({
  currentTicker,
  currentDateRange,
  currentLookBackRange,
  setDateRange,
  searchPrimaryData,
  searchSecondaryData,
}) => {
  const renderBtnDateRange = () => {
    return Object.keys(dateRangeMapping).map((range) => {
      const currentValue = dateRangeMapping[range];
      const style = {
        backgroundColor: currentValue === currentDateRange ? "yellow" : "",
      };
      return (
        <button style={style} key={range} value={currentValue}>
          {range}
        </button>
      );
    });
  };

  const handleClick = (e) => {
    const selectedRange = parseInt(e.target.value);
    searchPrimaryData(currentTicker, selectedRange);
    searchSecondaryData(currentTicker, selectedRange, currentLookBackRange);
    setDateRange(selectedRange);
  };

  return <div onClick={handleClick}>{renderBtnDateRange()}</div>;
};

export default DateRange;
