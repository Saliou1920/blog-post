require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello World");
  res.status(200).send("Hello World");
});

app.get("/api/ping", (req, res) => {
  res.status(200).send({ suceess: true });
});
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await app.listen(port);
    console.log(`Server started at http://localhost:${port}`);
  } catch (err) {
    console.error(err);
  }
};

start();
