const {
  generatePrimaryData,
  generateSecondaryDataPx,
  generateSecondaryDataVol,
  generateTableData,
} = require("./generateData.js");
const { fetchData, fetchAllAnalystData } = require("./fetchData.js");
const { getDb } = require("./db.js");

const primaryData = async (_, { ticker, dateRange }) => {
  if (!ticker) return;

  const { historicalTickerData, analystData } = await fetchData(ticker);

  const primaryData = generatePrimaryData(
    historicalTickerData,
    analystData,
    dateRange
  );

  return primaryData;
};

const secondaryDataPx = async (_, { ticker, dateRange, lookBackDuration }) => {
  if (!ticker) return;

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
  if (!ticker) return;

  const { historicalTickerData, analystData } = await fetchData(ticker);
  const secondaryDataVol = generateSecondaryDataVol(
    historicalTickerData,
    analystData,
    dateRange,
    lookBackDuration
  );

  return secondaryDataVol;
};

const tableData = async (_, { eventName, ticker, creator }) => {
  const eventNameOption = !eventName
    ? {}
    : { event_name: { $regex: `^${eventName}`, $options: "i" } };
  const tickerOption = !ticker
    ? {}
    : { ticker: { $regex: `^${ticker}`, $options: "i" } };
  const creatorOption = !creator
    ? {}
    : { creator: { $regex: `^${creator}`, $options: "i" } };

  const allOptions = {
    $and: [eventNameOption, tickerOption, creatorOption],
  };
  const analystData = await fetchAllAnalystData(allOptions);
  const tableData = generateTableData(analystData);

  return tableData;
};

module.exports = {
  primaryData,
  secondaryDataPx,
  secondaryDataVol,
  tableData,
};
