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

const generatePrimaryData = (historicalTickerData, analystData, dateRange) => {
  const { RIC: ric, name, benchmark_index } = analystData;

  const slicedData = sliceHistoricalData(historicalTickerData, dateRange);
  const primaryData = Object.assign(
    { ...slicedData },
    { ric, name, benchmark_index }
  );

  return primaryData;
};

const generateSecondaryData = (
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
    px_volume: tickerVol,
  } = slicedHistoricalTickerData;

  const {
    ticker: benchmark,
    date: benchmarkDate,
    px_last: benchmarkPx,
    px_volume: benchmarkVol,
  } = slicedHistoricalBenchmarkData;

  const reconciledDate = [];
  const pxDelta = [];
  const pxDeltaVsIdx = [];

  let tickerPxAcc = 0;
  let benchmarkPxAcc = 0;

  tickerDate.forEach((_, idx) => {
    const currentDate = tickerDate[idx];
    const currentTickerPx = tickerPx[idx];
    const currentBenchmarkPx = benchmarkPx[idx];

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

    reconciledDate.push(currentDate);
    pxDelta.push(currentTickerPxDelta.toFixed(2));
    pxDeltaVsIdx.push(currentPxDeltaVsIdx.toFixed(2));

    tickerPxAcc -= tickerPx[idx - lookBackDuration];
    tickerPxAcc += currentTickerPx;

    benchmarkPxAcc -= benchmarkPx[idx - lookBackDuration];
    benchmarkPxAcc += currentBenchmarkPx;
  });

  return {
    ticker,
    benchmark_index: benchmark,
    date: reconciledDate,
    pxDelta,
    pxDeltaVsIdx,
  };
};

module.exports = {
  generatePrimaryData,
  generateSecondaryData,
};
