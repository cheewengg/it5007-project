import "../css/general.css";
import "../css/styles.css";

import React from "react";
import { tableHeader as header } from "../misc/config.jsx";
import { formatFloat, renderDate } from "../misc/util.jsx";

const TableRow = ({ rowData, searchDataConfig, queryConfig }) => {
  const {
    dateRange,
    lookBackRangePx,
    lookBackRangeVol,
    searchPrimaryData,
    searchSecondaryDataPx,
    searchSecondaryDataVol,
  } = searchDataConfig;

  const { queryEventName, queryTicker, queryCreator } = queryConfig;

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
    searchPrimaryData(ticker, dateRange);
    searchSecondaryDataPx(ticker, dateRange, lookBackRangePx);
    searchSecondaryDataVol(ticker, dateRange, lookBackRangeVol);
  };

  const renderInnerHTML = (key, content) => {
    if (!content) return [undefined, undefined];
    const contentString = content.toString();
    let splitIdx;

    switch (key) {
      case "eventName":
        splitIdx = queryEventName.length;
        break;
      case "ticker":
        splitIdx = queryTicker.length;
        break;
      case "creator":
        splitIdx = queryCreator.length;
        break;
      default:
        splitIdx = 0;
        break;
    }

    const leftSubString = contentString.substring(0, splitIdx);
    const rightSubString = contentString.substring(splitIdx);

    return [leftSubString, rightSubString];
  };

  const renderRowContent = (rowData) => {
    const headerKeys = Object.keys(header);
    const formattedData = formatDataRow(rowData);

    const rowContent = headerKeys.map((key) => {
      const colContent = formattedData[key];
      const onClick =
        key === "ticker" ? () => handleSearchTicker(colContent) : null;
      const className = `dataTable__row ${
        key === "ticker" ? "col__ticker" : "col__default"
      }`;
      const [leftSubString, rightSubString] = renderInnerHTML(key, colContent);

      return (
        <div key={key} onClick={onClick} className={className}>
          <span>{leftSubString}</span>
          {rightSubString}
        </div>
      );
    });
    return rowContent;
  };

  return <>{renderRowContent(rowData)}</>;
};

export default TableRow;
