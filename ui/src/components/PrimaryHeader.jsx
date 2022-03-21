import "../styles/styles.css";
import React from "react";

const PrimaryHeader = ({ primaryHeaderData }) => {
  const {
    ric,
    name,
    currency,
    mostRecentDate,
    mostRecentPrice,
    announcementDate,
    differenceAbs,
    differencePercent,
  } = primaryHeaderData;

  return (
    <div className="section__primaryHeader">
      <div className="primaryHeader__ric">{ric}</div>
      <div className="primaryHeader__tickerName">{name}</div>
      <div className="primaryHeader__main">
        <div className="primaryHeader__main--px">
          {mostRecentPrice ? mostRecentPrice.toFixed(2) : ""}
        </div>
        <div className="primaryHeader__main--currency">{currency}</div>
        <div className="primaryHeader__main--pxChangeAbs">{differenceAbs}</div>
        <div className="primaryHeader__main--pxChangePercent">
          {differencePercent}%
        </div>
      </div>
      <div className="primaryHeader__date">{mostRecentDate}</div>
      {/* <div>Announcement Date: {announcementDate}</div> */}
    </div>
  );
};

export default PrimaryHeader;
