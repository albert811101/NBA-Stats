const cron = require("node-cron");
const { fetchBoxscore, createPlayerStats } = require("./server/controllers/fantasy_controller");

cron.schedule("26 22 * * *", () => {
  console.log("add today boxscore");
  fetchBoxscore();
});

cron.schedule("27 22 * * *", () => {
  console.log("update player stats in playoff");
  createPlayerStats();
});

cron.schedule("23 09 * * *", () => {
  console.log("good job!");
});
