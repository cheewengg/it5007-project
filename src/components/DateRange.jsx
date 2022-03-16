import React, { useState, useEffect } from "react";
import { dateRangeMapping } from "../misc/util.jsx";

const DateRange = ({ currentTitle, onClick }) => {
  const renderBtnDateRange = () => {
    return Object.keys(dateRangeMapping).map((range) => (
      <button key={range} value={dateRangeMapping[range]}>
        {range}
      </button>
    ));
  };

  const handleClick = (e) => {
    const selectedRange = e.target.value;
    onClick(currentTitle, selectedRange);
  };

  return <div onClick={handleClick}>{renderBtnDateRange()}</div>;
};

export default DateRange;
