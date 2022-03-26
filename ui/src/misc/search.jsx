import { formatDate, formatFloat, graphQLFetch, renderDate } from "./util.jsx";

export const searchPrimaryData = async (searchQuery, dateRange) => {
  const query = `query {
          primaryData (ticker: "${searchQuery}", dateRange: ${dateRange}) {
            ticker ric companyName benchmarkIdx currency announcementDate closeDate closePx closeVol
          }
        }`;

  const { primaryData } = await graphQLFetch(query);
  if (!primaryData) return;

  const {
    ticker,
    ric,
    companyName,
    benchmarkIdx,
    currency,
    announcementDate,
    closeDate,
    closePx,
    closeVol,
  } = primaryData;

  const primaryChartData = [["Date", `closePx`, "closeVol"]];

  closeDate.forEach((_, idx) => {
    const currentDate = formatDate(closeDate[idx]);
    const currentPx = closePx[idx];
    const currentVol = closeVol[idx];

    primaryChartData.push([currentDate, currentPx, currentVol]);
  });

  return {
    ticker,
    ric,
    companyName,
    benchmarkIdx,
    currency,
    announcementDate: formatDate(announcementDate),
    primaryChartData,
  };
};

export const searchSecondaryDataPx = async (
  searchQuery,
  dateRange,
  lookBackDuration
) => {
  const query = `query {
            secondaryDataPx (ticker: "${searchQuery}", dateRange: ${dateRange}, lookBackDuration: ${lookBackDuration}) {
                ticker benchmarkIdx closeDate pxDelta pxDeltaVsIdx
            }
          }`;

  const { secondaryDataPx } = await graphQLFetch(query);
  if (!secondaryDataPx) return;

  const { ticker, benchmarkIdx, closeDate, pxDelta, pxDeltaVsIdx } =
    secondaryDataPx;

  const secondaryChartDataPx = [["Date", "pxDelta", "pxDeltaVsIdx"]];

  closeDate.forEach((_, idx) => {
    const currentDate = formatDate(closeDate[idx]);
    const currentPxDelta = formatFloat(pxDelta[idx]);
    const currentPxDeltaVsIdx = formatFloat(pxDeltaVsIdx[idx]);
    secondaryChartDataPx.push([
      currentDate,
      currentPxDelta,
      currentPxDeltaVsIdx,
    ]);
  });

  return { ticker, benchmarkIdx, secondaryChartDataPx };
};

export const searchSecondaryDataVol = async (
  searchQuery,
  dateRange,
  lookBackDuration
) => {
  const query = `query {
            secondaryDataVol (ticker: "${searchQuery}", dateRange: ${dateRange}, lookBackDuration: ${lookBackDuration}) {
                ticker announcementDate demandShare closeDate excessVol
            }
          }`;

  const { secondaryDataVol } = await graphQLFetch(query);
  if (!secondaryDataVol) return;

  const { ticker, announcementDate, demandShare, closeDate, excessVol } =
    secondaryDataVol;

  const secondaryChartDataVol = [["Date", "excessVol"]];

  closeDate.forEach((_, idx) => {
    const currentDate = formatDate(closeDate[idx]);
    const currentExcessVol = formatFloat(excessVol[idx]);
    secondaryChartDataVol.push([currentDate, currentExcessVol]);
  });

  return {
    ticker,
    announcementDate,
    demandShare,
    secondaryChartDataVol,
  };
};

export const getTableData = async (
  eventName = "",
  ticker = "",
  creator = ""
) => {
  const query = `query {
    tableData(eventName: "${eventName}", ticker: "${ticker}", creator: "${creator}") {
      eventName ticker name announcementDate tradeDate predictionDate conviction side demandUSD demandShare creator
    }
  }`;

  const { tableData } = await graphQLFetch(query);
  if (!tableData) return;

  return tableData;
};
