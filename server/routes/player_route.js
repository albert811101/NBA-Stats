const router = require("express").Router();
const {
  getPlayerBio,
  fetchPlayerStats,
  fetchPlayerBio,
  createPlayerBio,
  getRecentGames,
  getPlayerName,
  fetchStatslLeader
} = require("../controllers/player_controller");

router.route("/player/player_averagestats")
  .get(fetchPlayerStats);

router.route("/player/fetchPlayerbio")
  .get(fetchPlayerBio);

router.route("/player/statsleader")
  .get(fetchStatslLeader);

router.route("/player/create_player_bio")
  .get(createPlayerBio);

router.route("/player/playerbio")
  .get(getPlayerBio);

router.route("/player/recent_games")
  .get(getRecentGames);

router.route("/player/playername")
  .post(getPlayerName);

module.exports = router;
