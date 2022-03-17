const fs = require("fs");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { MongoClient } = require("mongodb");
const { generatePrimaryData, generateSecondaryData } = require("./helper.js");

const url =
  "mongodb+srv://gary:PZMpNYgdUM3LysH8@indexrebalance.qhnra.mongodb.net/indexrebalance?retryWrites=true&w=majority";

let db;

const connectToDb = async () => {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log("Connected to MongoDB at", url);
  db = client.db();
};

const generateData = async (ticker) => {
  const historicalTickerData = await db
    .collection("historical")
    .findOne({ ticker: ticker });

  const brianfreitasData = await db
    .collection("brianfreitas")
    .findOne({ ticker: ticker });

  return { historicalTickerData, brianfreitasData };
};

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

const resolvers = {
  Query: {
    primaryData,
    secondaryData,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync("./server/schema.graphql", "utf-8"),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

const app = express();

app.use(express.static("public"));

server.applyMiddleware({ app, path: "/graphql" });

(async function () {
  try {
    await connectToDb();
    app.listen(3000, function () {
      console.log("App started on port 3000");
    });
  } catch (err) {
    console.log("ERROR:", err);
  }
})();
