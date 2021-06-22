const cron = require("node-cron");
const { createPlayers, createPlayerStats } = require("./server/models/fantasy_model");

cron.schedule("0 15 * * *", () => {
  createPlayers();
  console.log("add today boxscore");
});

cron.schedule("0 16 * * *", () => {
  createPlayerStats();
  console.log("update player stats in playoff");
});
