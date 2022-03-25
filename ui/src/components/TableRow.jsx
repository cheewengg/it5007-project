import "../css/general.css";
import "../css/styles.css";

import React from "react";
import { tableHeader as header } from "../misc/config.jsx";
import { formatFloat, renderDate } from "../misc/util.jsx";

const TableRow = ({ rowData, searchDataConfig, searchTerm }) => {
  const {
    currentDateRange,
    currentLookBackRangePx,
    currentLookBackRangeVol,
    searchPrimaryData,
    searchSecondaryDataPx,
    searchSecondaryDataVol,
  } = searchDataConfig;

  const formatDataRow = (rowData) => {
    const {
      announcementDate,
      tradeDate,
      predictionDate,
      demandUSD,
      demandShare,
    } = rowData;

    return Object.assign(
      { ...rowData },
      {
        announcementDate: renderDate(announcementDate),
        tradeDate: renderDate(tradeDate),
        predictionDate: renderDate(predictionDate),
        demandUSD: formatFloat(demandUSD),
        demandShare: formatFloat(demandShare),
      }
    );
  };

  const handleSearchTicker = (ticker) => {
    searchPrimaryData(ticker, currentDateRange);
    searchSecondaryDataPx(ticker, currentDateRange, currentLookBackRangePx);
    searchSecondaryDataVol(ticker, currentDateRange, currentLookBackRangeVol);
  };

  const renderColTicker = (ticker) => {
    const splitIdx = searchTerm.length;
    const leftSubString = ticker.substring(0, splitIdx);
    const rightSubString = ticker.substring(splitIdx);

    return (
      <div
        key="ticker"
        onClick={() => handleSearchTicker(ticker)}
        className="col__ticker dataTable__row"
      >
        <span>{leftSubString}</span>
        {rightSubString}
      </div>
    );
  };

  const renderRowContent = (rowData) => {
    const headerKeys = Object.keys(header);
    const formattedData = formatDataRow(rowData);
    const rowContent = [];

    headerKeys.forEach((key) => {
      const colContent =
        key === "ticker" ? (
          renderColTicker(formattedData[key])
        ) : (
          <div key={key} className="col__default dataTable__row">
            {formattedData[key]}
          </div>
        );
      rowContent.push(colContent);
    });
    return rowContent;
  };

  return <>{renderRowContent(rowData)}</>;
};

export default TableRow;
