require("dotenv").config();
const express = require("express");
const { connectToDb } = require("./db.js");
const { installHandler } = require("./api_handler.js");

const app = express();
installHandler(app);

const port = process.env.API_SERVER_PORT || 3000;

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
