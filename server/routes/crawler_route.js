const router = require("express").Router();
const {
  fetchPlayerstats,
  createPlayerbio,
  fetchStatsleader,
  fetchBoxscore
} = require("../controllers/crawler_controller");

router.route("/crawler/player_averagestats")
  .get(fetchPlayerstats);

router.route("/crawler/statsleader")
  .get(fetchStatsleader);

router.route("/crawler/createPlayerbio")
  .get(createPlayerbio);

router.route("/crawler/getBoxscore")
  .get(fetchBoxscore);

module.exports = router;
