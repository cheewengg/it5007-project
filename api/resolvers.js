const {
  generateData,
  generatePrimaryData,
  generateSecondaryDataPx,
  generateSecondaryDataVol,
} = require("./generateData.js");
const { getDb } = require("./db.js");

const primaryData = async (_, { ticker, dateRange }) => {
  const { historicalTickerData, brianfreitasData } = await generateData(ticker);

  const primaryData = generatePrimaryData(
    historicalTickerData,
    brianfreitasData,
    dateRange
  );

  return primaryData;
};

const secondaryDataPx = async (_, { ticker, dateRange, lookBackDuration }) => {
  const db = getDb();

  const { historicalTickerData, brianfreitasData } = await generateData(ticker);
  const { benchmark_index } = brianfreitasData;

  const historicalBenchmarkData = await db
    .collection("historical")
    .findOne({ ticker: benchmark_index });

  const secondaryDataPx = generateSecondaryDataPx(
    historicalTickerData,
    historicalBenchmarkData,
    dateRange,
    lookBackDuration
  );

  return secondaryDataPx;
};

const secondaryDataVol = async (_, { ticker, dateRange, lookBackDuration }) => {
  const { historicalTickerData, brianfreitasData } = await generateData(ticker);

  const secondaryDataVol = generateSecondaryDataVol(
    historicalTickerData,
    brianfreitasData,
    dateRange,
    lookBackDuration
  );

  return secondaryDataVol;
};

module.exports = {
  primaryData,
  secondaryDataPx,
  secondaryDataVol,
};
