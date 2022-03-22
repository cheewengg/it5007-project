import "../css/styles.css";
import React from "react";

const RangeSelector = ({ rangeMap, config }) => {
  const {
    currentTicker,
    primaryRange,
    secondaryRange1,
    secondaryRange2,
    setPrimaryRange,
    searchData,
  } = config;

  const renderBtnRangeSelector = (primaryRange) => {
    return Object.keys(rangeMap).map((range) => {
      const currentValue = rangeMap[range];
      const className =
        currentValue === primaryRange
          ? "rangeSelector__btn--selected rangeSelector__btn"
          : "rangeSelector__btn";
      return (
        <button className={className} key={range} value={currentValue}>
          {range}
        </button>
      );
    });
  };

  const handleClick = (e) => {
    if (!e.target.value) return;
    const selectedRange = parseInt(e.target.value);

    searchData(currentTicker, selectedRange, secondaryRange1, secondaryRange2);
    setPrimaryRange(selectedRange);
  };

  return (
    <div className="section__rangeSelector" onClick={handleClick}>
      {renderBtnRangeSelector(primaryRange)}
    </div>
  );
};

export default RangeSelector;
