import { createToolTipPrimaryChart, renderDate } from "./util.jsx";

const graphQLFetch = async (query, variables = {}) => {
  try {
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == "BAD_USER_INPUT") {
        const details = error.extensions.errors.join("\n ");
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
};

const searchPrimaryData = async (searchQuery, dateRange) => {
  const query = `query {
          primaryData (ticker: "${searchQuery}", dateRange: ${dateRange}) {
            ticker ric name benchmark_index currency announcement_date date px_last px_volume
          }
        }`;

  const { primaryData } = await graphQLFetch(query);
  if (!primaryData) return;

  const {
    ticker,
    ric,
    name,
    benchmark_index: benchMarkIdx,
    currency,
    announcement_date: announcementDate,
    date,
    px_last,
    px_volume,
  } = primaryData;
  const primaryChartData = [["Date", "Close"]];

  date.forEach((_, idx) => {
    const currentDate = renderDate(date[idx]);
    const currentPx = px_last[idx];

    primaryChartData.push([currentDate, currentPx]);
  });

  const res = {
    ticker,
    ric,
    name,
    benchMarkIdx,
    currency,
    announcementDate: renderDate(announcementDate),
    primaryChartData,
  };

  return res;
};

const searchSecondaryDataPx = async (
  searchQuery,
  dateRange,
  lookBackDuration
) => {
  const query = `query {
            secondaryDataPx (ticker: "${searchQuery}", dateRange: ${dateRange}, lookBackDuration: ${lookBackDuration}) {
                ticker benchmark_index date pxDelta pxDeltaVsIdx
            }
          }`;

  const { secondaryDataPx } = await graphQLFetch(query);
  if (!secondaryDataPx) return;

  const { ticker, benchmark_index, date, pxDelta, pxDeltaVsIdx } =
    secondaryDataPx;

  const secondaryChartDataPx = [["Date", "pxDelta", "pxDeltaVsIdx"]];

  date.forEach((_, idx) => {
    const currentDate = renderDate(date[idx]);
    const currentPxDelta = pxDelta[idx];
    const currentPxDeltaVsIdx = pxDeltaVsIdx[idx];
    secondaryChartDataPx.push([
      currentDate,
      currentPxDelta,
      currentPxDeltaVsIdx,
    ]);
  });

  const res = { ticker, benchmark_index, secondaryChartDataPx };
  return res;
};

const searchSecondaryDataVol = async (
  searchQuery,
  dateRange,
  lookBackDuration
) => {
  const query = `query {
            secondaryDataVol (ticker: "${searchQuery}", dateRange: ${dateRange}, lookBackDuration: ${lookBackDuration}) {
                ticker announcement_date demand_shares date excessVol
            }
          }`;

  const { secondaryDataVol } = await graphQLFetch(query);
  if (!secondaryDataVol) return;

  const { ticker, announcement_date, demand_shares, date, excessVol } =
    secondaryDataVol;

  const secondaryChartDataVol = [["Date", "excessVol"]];

  date.forEach((_, idx) => {
    const currentDate = renderDate(date[idx]);
    const currentExcessVol = excessVol[idx];
    secondaryChartDataVol.push([currentDate, currentExcessVol]);
  });

  const res = {
    ticker,
    announcement_date,
    demand_shares,
    secondaryChartDataVol,
  };
  return res;
};

export const searchPrimaryDataConfig = {
  searchData: searchPrimaryData,
  dateRange: 100000,
};

export const searchSecondaryDataPxConfig = {
  searchData: searchSecondaryDataPx,
  dateRange: 100000,
  lookBackDuration: 90,
};

export const searchSecondaryDataVolConfig = {
  searchData: searchSecondaryDataVol,
  dateRange: 100000,
  lookBackDuration: 1,
};
