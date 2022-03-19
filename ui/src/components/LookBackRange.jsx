import React from "react";
import { lookBackRangeMapping } from "../misc/util.jsx";

const LookBackRange = ({
  currentTicker,
  currentDateRange,
  currentLookBackRange,
  setLookBackRange,
  searchSecondaryData,
}) => {
  const renderBtnLookBackRange = () => {
    return Object.keys(lookBackRangeMapping).map((range) => {
      const currentValue = lookBackRangeMapping[range];
      const style = {
        backgroundColor: currentValue === currentLookBackRange ? "yellow" : "",
      };
      return (
        <button style={style} key={range} value={lookBackRangeMapping[range]}>
          {range}
        </button>
      );
    });
  };

  const handleClick = (e) => {
    const selectedRange = parseInt(e.target.value);
    searchSecondaryData(currentTicker, currentDateRange, selectedRange);
    setLookBackRange(selectedRange);
  };

  return <div onClick={handleClick}>{renderBtnLookBackRange()}</div>;
};

export default LookBackRange;
