require("dotenv").config();
const fs = require("fs");
const { ApolloServer } = require("apollo-server-express");
const {
  primaryData,
  secondaryDataPx,
  secondaryDataVol,
  tableData,
} = require("./resolvers.js");

const resolvers = {
  Query: {
    primaryData,
    secondaryDataPx,
    secondaryDataVol,
    tableData,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync("./schema.graphql", "utf-8"),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

const installHandler = (app) => {
  const enableCors = (process.env.ENABLE_CORS || "true") === "true";
  console.log("CORS setting:", enableCors);
  server.applyMiddleware({ app, path: "/graphql", cors: enableCors });
};

module.exports = { installHandler };
