import "../css/general.css";
import "../css/styles.css";

import React from "react";
import { formatFloat, renderDate } from "../misc/util.jsx";

const DataTable = ({ tableData, setTableData }) => {
  const tableHeader = {
    eventName: "Event Name",
    ticker: "Ticker",
    name: "Company",
    announcementDate: "Announcement Date",
    tradeDate: "Trade Date",
    predictionDate: "Prediction Date",
    conviction: "Conviction",
    side: "Side",
    demandUSD: "Demand (USD)",
    demandShare: "Demand (Shares)",
  };

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

  const renderTableContent = (tableData) => {
    const tableContent = [];
    const tableHeaderKeys = Object.keys(tableHeader);

    tableHeaderKeys.forEach((header) => {
      const col = (
        <div className="dataTable__header">{tableHeader[header]}</div>
      );
      tableContent.push(col);
    });

    tableData.forEach((data) => {
      const formattedData = formatDataRow(data);
      tableHeaderKeys.forEach((header) => {
        const col = (
          <div className="dataTable__row">{formattedData[header]}</div>
        );
        tableContent.push(col);
      });
    });

    return tableContent;
  };

  return (
    <div className="section__dataTable">
      {tableData.length > 0 ? renderTableContent(tableData) : "Loading"}
    </div>
  );
};

export default DataTable;
