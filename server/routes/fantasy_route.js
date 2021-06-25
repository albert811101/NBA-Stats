const router = require("express").Router();

const {
  authentication
} = require("../../util/util");

const {
  fetchSchedule,
  getSchedule,
  getTotalScore,
  getRanking,
  getSelectedPlayers,
  getHistoryPlayers,
  getUserProfile,
  fetchPlayerStats,
  createPlayerStats
} = require("../controllers/fantasy_controller");

router.route("/fantasy/schedule")
  .get(fetchSchedule);

router.route("/fantasy/history_schedule")
  .post(authentication(), getSchedule);

router.route("/fantasy/total_score")
  .get(authentication(), getTotalScore);

router.route("/fantasy/ranking")
  .get(authentication(), getRanking);

router.route("/fantasy/selected_players")
  .post(authentication(), getSelectedPlayers);

router.route("/fantasy/history_players")
  .post(authentication(), getHistoryPlayers);

router.route("/user/profile")
  .get(authentication(), getUserProfile);

router.route("/fantasy/playerstats")
  .get(fetchPlayerStats);

router.route("/fantasy/create_playerstats")
  .get(createPlayerStats);

module.exports = router;
