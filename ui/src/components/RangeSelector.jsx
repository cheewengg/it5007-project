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
      const style = {
        backgroundColor: currentValue === primaryRange ? "yellow" : "",
      };
      return (
        <button style={style} key={range} value={currentValue}>
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
    <div onClick={handleClick}>{renderBtnRangeSelector(primaryRange)}</div>
  );
};

export default RangeSelector;
