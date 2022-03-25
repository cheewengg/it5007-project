const {
  fetchData,
  fetchAllAnalystData,
  generatePrimaryData,
  generateSecondaryDataPx,
  generateSecondaryDataVol,
  generateTableData,
} = require("./generateData.js");
const { getDb } = require("./db.js");

const primaryData = async (_, { ticker, dateRange }) => {
  const { historicalTickerData, analystData } = await fetchData(ticker);

  const primaryData = generatePrimaryData(
    historicalTickerData,
    analystData,
    dateRange
  );

  return primaryData;
};

const secondaryDataPx = async (_, { ticker, dateRange, lookBackDuration }) => {
  const db = getDb();

  const { historicalTickerData, analystData } = await fetchData(ticker);

  const { benchmark_index } = analystData;

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
  const { historicalTickerData, analystData } = await fetchData(ticker);

  const secondaryDataVol = generateSecondaryDataVol(
    historicalTickerData,
    analystData,
    dateRange,
    lookBackDuration
  );

  return secondaryDataVol;
};

const tableData = async (_, { match }) => {
  const options = !match
    ? {}
    : { ticker: { $regex: `^${match}`, $options: "i" } };

  const analystData = await fetchAllAnalystData(options);

  const tableData = generateTableData(analystData);

  return tableData;
};

module.exports = {
  primaryData,
  secondaryDataPx,
  secondaryDataVol,
  tableData,
};
