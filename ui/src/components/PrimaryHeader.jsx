import React, { useState, useEffect } from "react";

const PrimaryHeader = ({ primaryHeaderData }) => {
  const {
    ric,
    name,
    currency,
    mostRecentDate,
    mostRecentPrice,
    differenceAbs,
    differencePercent,
  } = primaryHeaderData;

  return (
    <div style={{ margin: "10px 0" }}>
      <div>{ric}</div>
      <div>{name}</div>
      <div style={{ display: "flex", gap: "10px" }}>
        <div>{mostRecentPrice}</div>
        <div>{currency}</div>
        <div>{differenceAbs}</div>
        <div>{differencePercent} %</div>
      </div>
      <div>{mostRecentDate}</div>
    </div>
  );
};

export default PrimaryHeader;
