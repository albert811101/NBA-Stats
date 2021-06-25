const cron = require("node-cron");
const { fetchBoxscore, createPlayerStats } = require("./server/controllers/fantasy_controller");

cron.schedule("00 09 * * *", () => {
  console.log("add today boxscore");
  fetchBoxscore();
});

cron.schedule("22 09 * * *", () => {
  console.log("update player stats in playoff");
  createPlayerStats();
});

cron.schedule("23 09 * * *", () => {
  console.log("good job!");
});
