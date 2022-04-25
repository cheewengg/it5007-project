import "../css/styles.css";
import React from "react";

const PrimaryHeader = ({ primaryHeaderData }) => {
  const {
    ric,
    companyName,
    currency,
    mostRecentDate,
    mostRecentPrice,
    differenceAbs,
    differencePercent,
  } = primaryHeaderData;

  return (
    <div className="section__primaryHeader">
      <div className="primaryHeader__ric">{ric}</div>
      <div className="primaryHeader__tickerName">{companyName}</div>
      <div className="primaryHeader__main">
        <div className="primaryHeader__main--px">{mostRecentPrice}</div>
        <div className="primaryHeader__main--currency">{currency}</div>
        <div className="primaryHeader__main--pxChangeAbs">{differenceAbs}</div>
        <div className="primaryHeader__main--pxChangePercent">
          {differencePercent} {differencePercent ? "%" : ""}
        </div>
      </div>
      <div className="primaryHeader__date">{mostRecentDate}</div>
    </div>
  );
};

export default PrimaryHeader;
