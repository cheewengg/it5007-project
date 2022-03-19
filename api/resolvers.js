const {
  generateData,
  generatePrimaryData,
  generateSecondaryData,
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

const secondaryData = async (_, { ticker, dateRange, lookBackDuration }) => {
  const db = getDb();

  const { historicalTickerData, brianfreitasData } = await generateData(ticker);
  const { benchmark_index } = brianfreitasData;

  const historicalBenchmarkData = await db
    .collection("historical")
    .findOne({ ticker: benchmark_index });

  const secondaryData = generateSecondaryData(
    historicalTickerData,
    historicalBenchmarkData,
    dateRange,
    lookBackDuration
  );

  return secondaryData;
};

module.exports = {
  primaryData,
  secondaryData,
};
