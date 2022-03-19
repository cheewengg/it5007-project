require("dotenv").config();
const { MongoClient } = require("mongodb");

let db;

const connectToDb = async () => {
  const url =
    process.env.DB_URL ||
    "mongodb+srv://gary:PZMpNYgdUM3LysH8@indexrebalance.qhnra.mongodb.net/indexrebalance?retryWrites=true&w=majority";

  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();

  console.log("Connected to MongoDB at", url);
  db = client.db();
};

const getDb = () => {
  return db;
};

module.exports = { connectToDb, getDb };
