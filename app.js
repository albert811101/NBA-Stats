require("dotenv").config();
const { fetchPlayerstats } = require("./util/crawler");

const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/1.0",
  fetchPlayerstats
);

app.listen(3000, () => {
  console.log("The application is running on localhost:3000!");
});

module.exports = app;
