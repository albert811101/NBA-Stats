const cron = require("node-cron");
const { fetchBoxscore, createPlayerStats } = require("./server/controllers/fantasy_controller");

cron.schedule("0 15 * * *", () => {
  console.log("add today boxscore");
  fetchBoxscore();
});

cron.schedule("0 16 * * *", () => {
  console.log("update player stats in playoff");
  createPlayerStats();
});
