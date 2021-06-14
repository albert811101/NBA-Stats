require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/1.0",
  [
    require("./server/routes/player_route"),
    require("./server/routes/fantasy_route"),
    require("./server/routes/user_route"),
    require("./server/routes/main_route")
  ]
);

// eslint-disable-next-line node/handle-callback-err
app.use(function (err, req, res, next) {
  console.log("err");
  res.status(500).send("server error");
});

app.listen(3000, () => {
  console.log("The application is running on localhost:3000!");
});

module.exports = app;
