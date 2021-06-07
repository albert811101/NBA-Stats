const router = require("express").Router();
const {
  getPlayerbio,
  fetchPlayerstats,
  fetchPlayerbio,
  createPlayerbio,
  getRecentgames,
  getPlayername,
  fetchStatsleader
} = require("../controllers/player_controller");

router.route("/player/player_averagestats")
  .get(fetchPlayerstats);

router.route("/player/fetchPlayerbio")
  .get(fetchPlayerbio);

router.route("/player/statsleader")
  .get(fetchStatsleader);

router.route("/player/createPlayerbio")
  .get(createPlayerbio);

router.route("/player/playerbio")
  .get(getPlayerbio);

router.route("/player/recent_games")
  .get(getRecentgames);

router.route("/player/playername")
  .post(getPlayername);

module.exports = router;
