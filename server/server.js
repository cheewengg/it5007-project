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

const historicalData = async (_, { ticker }) => {
  const historical = await db
    .collection("historical")
    .findOne({ ticker: ticker });

  return historical;
};

const allHistoricalData = async () => {
  const historical = await db.collection("historical").find({}).toArray();
  return historical;
};

const resolvers = {
  Query: {
    allHistoricalData,
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
