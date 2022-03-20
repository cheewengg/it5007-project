const { getDb } = require("./db.js");

const sliceHistoricalData = (historicalData, dateRange) => {
  const rightBound = historicalData["px_volume"].length;
  const primaryDataLength = Math.min(rightBound, dateRange);
  const leftBound = rightBound - primaryDataLength;

  const slicedData = Object.assign(
    { ...historicalData },
    { date: historicalData["date"].slice(leftBound, rightBound) },
    { px_last: historicalData["px_last"].slice(leftBound, rightBound) },
    {
      px_volume: historicalData["px_volume"].slice(leftBound, rightBound),
    }
  );

  return slicedData;
};

const generateData = async (ticker) => {
  const db = getDb();

  const historicalTickerData = await db
    .collection("historical")
    .findOne({ ticker: ticker });

  const brianfreitasData = await db
    .collection("brianfreitas")
    .findOne({ ticker: ticker });

  return { historicalTickerData, brianfreitasData };
};

const generatePrimaryData = (historicalTickerData, analystData, dateRange) => {
  const { RIC: ric, name, benchmark_index, announcement_date } = analystData;

  const slicedData = sliceHistoricalData(historicalTickerData, dateRange);

  const primaryData = Object.assign(
    { ...slicedData },
    { ric, name, benchmark_index, announcement_date }
  );
  return primaryData;
};

const generateSecondaryDataPx = (
  historicalTickerData,
  historicalBenchmarkData,
  dateRange,
  lookBackDuration
) => {
  const actualDateRange = dateRange + lookBackDuration;
  const slicedHistoricalTickerData = sliceHistoricalData(
    historicalTickerData,
    actualDateRange
  );
  const slicedHistoricalBenchmarkData = sliceHistoricalData(
    historicalBenchmarkData,
    actualDateRange
  );

  const {
    ticker,
    date: tickerDate,
    px_last: tickerPx,
  } = slicedHistoricalTickerData;

  const {
    ticker: benchmark,
    date: benchmarkDate,
    px_last: benchmarkPx,
  } = slicedHistoricalBenchmarkData;

  const reconciledIdx = benchmarkDate.length - tickerDate.length;
  const date = [];
  const pxDelta = [];
  const pxDeltaVsIdx = [];

  let tickerPxAcc = 0;
  let benchmarkPxAcc = 0;

  tickerDate.forEach((_, idx) => {
    const currentDate = tickerDate[idx];
    const currentTickerPx = tickerPx[idx];
    const currentBenchmarkPx = benchmarkPx[idx + reconciledIdx];

    if (idx < lookBackDuration) {
      tickerPxAcc += currentTickerPx;
      benchmarkPxAcc += currentBenchmarkPx;
      return;
    }

    const currentTickerBasePx = tickerPxAcc / lookBackDuration;
    const currentBenchmarkBasePx = benchmarkPxAcc / lookBackDuration;

    const currentTickerPxDelta =
      ((currentTickerPx - currentTickerBasePx) / currentTickerBasePx) * 100;
    const currentBenchmarkPxDelta =
      ((currentBenchmarkPx - currentBenchmarkBasePx) / currentBenchmarkBasePx) *
      100;
    const currentPxDeltaVsIdx = currentTickerPxDelta - currentBenchmarkPxDelta;

    date.push(currentDate);
    pxDelta.push(currentTickerPxDelta.toFixed(2));
    pxDeltaVsIdx.push(currentPxDeltaVsIdx.toFixed(2));

    tickerPxAcc -= tickerPx[idx - lookBackDuration];
    tickerPxAcc += currentTickerPx;

    benchmarkPxAcc -= benchmarkPx[idx + reconciledIdx - lookBackDuration];
    benchmarkPxAcc += currentBenchmarkPx;
  });

  return {
    ticker,
    benchmark_index: benchmark,
    date,
    pxDelta,
    pxDeltaVsIdx,
  };
};

const generateSecondaryDataVol = (
  historicalTickerData,
  historicalBenchmarkData,
  dateRange,
  lookBackDuration
) => {
  const actualDateRange = dateRange + 6 * 20;
  const {
    ticker,
    date: tickerDate,
    px_volume: tickerVol,
  } = sliceHistoricalData(historicalTickerData, actualDateRange);
  const { announcement_date, demand_shares } = historicalBenchmarkData;

  const windowSpan = 3 * 20; // 3 months

  const startIdx = 6 * 20;
  let leftBound = startIdx - lookBackDuration;
  let historyAcc = 0;
  let lookBackAcc = 0;

  const date = [];
  const excessVol = [];

  tickerDate.forEach((_, idx) => {
    if (idx < windowSpan) historyAcc += tickerVol[idx];

    const rightBound = idx + windowSpan;
    if (rightBound < leftBound || rightBound >= tickerDate.length) return;
    if (rightBound >= leftBound && rightBound < startIdx) {
      lookBackAcc += tickerVol[rightBound];
      return;
    }

    const currentDate = tickerDate[rightBound];
    const avgHistoryVol = historyAcc / windowSpan;
    const currentExcessVol =
      ((lookBackAcc - avgHistoryVol * lookBackDuration) / demand_shares) * 100;

    date.push(currentDate);
    excessVol.push(currentExcessVol.toFixed(2));

    lookBackAcc -= tickerVol[leftBound];
    leftBound++;
    lookBackAcc += tickerVol[rightBound];

    historyAcc -= tickerVol[idx - windowSpan];
    historyAcc += tickerVol[idx];
  });

  return {
    ticker,
    announcement_date,
    demand_shares,
    date,
    excessVol,
  };
};

module.exports = {
  generateData,
  generatePrimaryData,
  generateSecondaryDataPx,
  generateSecondaryDataVol,
};
