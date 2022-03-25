const { getDb } = require("./db.js");
const { asyncFlatMap, asyncMap, flatten } = require("./helper.js");

const sliceData = (historicalData, dateRange) => {
  const rightBound = historicalData["px_volume"].length;
  const primaryDataLength = Math.min(rightBound, dateRange);
  const leftBound = rightBound - primaryDataLength;

  const slicedData = Object.assign(
    { ...historicalData },
    { closeDate: historicalData["date"].slice(leftBound, rightBound) },
    { closePx: historicalData["px_last"].slice(leftBound, rightBound) },
    {
      closeVol: historicalData["px_volume"].slice(leftBound, rightBound),
    }
  );

  return slicedData;
};

const findAnalystData = async (ticker) => {
  const db = getDb();
  const analystData =
    (await db.collection("brianfreitas").findOne({ ticker: ticker })) ||
    (await db.collection("intropic").findOne({ ticker: ticker })) ||
    (await db.collection("mizuho").findOne({ ticker: ticker }));

  return analystData;
};

const fetchAllAnalystData = async (options) => {
  const db = getDb();
  const allAnalyst = ["brianfreitas", "intropic", "mizuho"];

  const allAnalystData = await asyncFlatMap(allAnalyst, async (analyst) => {
    const data = await db.collection(analyst).find(options).toArray();

    return data;
  });

  return allAnalystData;
};

const fetchData = async (ticker) => {
  const db = getDb();

  const historicalTickerData = await db
    .collection("historical")
    .findOne({ ticker: ticker });

  const analystData = await findAnalystData(ticker);

  return { historicalTickerData, analystData };
};

const generatePrimaryData = (historicalTickerData, analystData, dateRange) => {
  const {
    RIC: ric,
    name: companyName,
    benchmark_index: benchmarkIdx,
    announcement_date: announcementDate,
  } = analystData;

  const slicedData = sliceData(historicalTickerData, dateRange);

  const primaryData = Object.assign(
    { ...slicedData },
    { ric, companyName, benchmarkIdx, announcementDate }
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
  const slicedHistoricalTickerData = sliceData(
    historicalTickerData,
    actualDateRange
  );
  const slicedHistoricalBenchmarkData = sliceData(
    historicalBenchmarkData,
    actualDateRange
  );

  const {
    ticker,
    closeDate: tickerDate,
    closePx: tickerPx,
  } = slicedHistoricalTickerData;

  const {
    ticker: benchmark,
    closeDate: benchmarkDate,
    closePx: benchmarkPx,
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
    pxDelta.push(currentTickerPxDelta);
    pxDeltaVsIdx.push(currentPxDeltaVsIdx);

    tickerPxAcc -= tickerPx[idx - lookBackDuration];
    tickerPxAcc += currentTickerPx;

    benchmarkPxAcc -= benchmarkPx[idx + reconciledIdx - lookBackDuration];
    benchmarkPxAcc += currentBenchmarkPx;
  });

  return {
    ticker,
    benchmarkIdx: benchmark,
    closeDate: date,
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
  const slicedHistoricalTickerData = sliceData(
    historicalTickerData,
    actualDateRange
  );

  const {
    ticker,
    closeDate: tickerDate,
    closeVol: tickerVol,
  } = slicedHistoricalTickerData;
  const { announcement_date: announcementDate, demand_shares: demandShare } =
    historicalBenchmarkData;

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
      ((lookBackAcc - avgHistoryVol * lookBackDuration) / demandShare) * 100;

    date.push(currentDate);
    excessVol.push(currentExcessVol);

    lookBackAcc -= tickerVol[leftBound];
    leftBound++;
    lookBackAcc += tickerVol[rightBound];

    historyAcc -= tickerVol[idx - windowSpan];
    historyAcc += tickerVol[idx];
  });

  return {
    ticker,
    announcementDate,
    demandShare,
    closeDate: date,
    excessVol,
  };
};

const generateTableData = (analystData) => {
  return analystData.map((data) => {
    const {
      event_name: eventName,
      ticker,
      name,
      announcement_date: announcementDate,
      trade_date: tradeDate,
      prediction_date: predictionDate,
      conviction,
      side,
      demand_usd: demandUSD,
      demand_shares: demandShare,
      creator,
    } = data;

    return {
      eventName,
      ticker,
      name,
      announcementDate,
      tradeDate,
      predictionDate,
      conviction,
      side,
      demandUSD,
      demandShare,
      creator,
    };
  });
};

module.exports = {
  fetchData,
  fetchAllAnalystData,
  generatePrimaryData,
  generateSecondaryDataPx,
  generateSecondaryDataVol,
  generateTableData,
};
