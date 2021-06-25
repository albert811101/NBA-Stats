const cron = require("node-cron");
const { fetchBoxscore, createPlayerStats } = require("./server/controllers/fantasy_controller");

cron.schedule("30 16 * * *", () => {
  console.log("add today boxscore");
  fetchBoxscore();
});

cron.schedule("31 16 * * *", () => {
  console.log("update player stats in playoff");
  createPlayerStats();
});

cron.schedule("32 16 * * *", () => {
  console.log("good job!");
});
