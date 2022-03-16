const fs = require("fs");
const express = require("express");
const { ApolloServer, UserInputError } = require("apollo-server-express");
const { GraphQLScalarType } = require("graphql");
const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://gary:PZMpNYgdUM3LysH8@indexrebalance.qhnra.mongodb.net/indexrebalance?retryWrites=true&w=majority";

let db;

const connectToDb = async () => {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log("Connected to MongoDB at", url);
  db = client.db();
};

const historicalData = async (_, { ticker, dateRange }) => {
  const fetchedData = await db
    .collection("historical")
    .findOne({ ticker: ticker });

  const rightBound = fetchedData["px_volume"].length;
  const historicalDataLength = Math.min(rightBound, dateRange);
  const leftBound = rightBound - historicalDataLength;

  const historicalData = Object.assign(
    { ...fetchedData },
    { date: fetchedData["date"].slice(leftBound, rightBound) },
    { px_last: fetchedData["px_last"].slice(leftBound, rightBound) },
    { px_volume: fetchedData["px_volume"].slice(leftBound, rightBound) }
  );

  return historicalData;
};

const resolvers = {
  Query: {
    historicalData,
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
