const { getDb } = require("./db.js");

const asyncFlatMap = async (arr, asyncFn) => {
  return Promise.all(flatten(await asyncMap(arr, asyncFn)));
};

const asyncMap = (arr, asyncFn) => {
  return Promise.all(arr.map(asyncFn));
};

const flatten = (arr) => {
  return [].concat(...arr);
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

module.exports = {
  fetchAllAnalystData,
  fetchData,
};
