const fs = require('fs');
const express = require('express');
const path = require("path");
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');
const url = "mongodb+srv://gary:PZMpNYgdUM3LysH8@indexrebalance.qhnra.mongodb.net/indexrebalance?retryWrites=true&w=majority" 

let db;

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

const resolvers = {
  Query: {
    issueList,
  },
  Mutation: {
    queryData,
  },
  GraphQLDate,
};

async function issueList() {
  const issues = await db.collection('brianfreitas').find({}).toArray();
  const issues2 = await db.collection('intropic').find({}).toArray();
  const res = issues.concat(issues2);
  return res;
}

async function queryData(_, issue) {
  const historical = await db.collection('historical').findOne({ticker: issue.ticker});
  return historical;
}

async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB Server');
  db = client.db();
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname, "../public")));
app.get("*", function (request, response) {response.sendFile(path.resolve(__dirname, "../public", "index.html"))});

server.applyMiddleware({ app, path: '/graphql' });

(async function () {
  try {
    await connectToDb();
    app.listen(PORT, function () {
      console.log(`App Started on ${ PORT }`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
