const router = require("express").Router();

const {
  authentication
} = require("../../util/util");

const {
  fetchschedule,
  getSchedule,
  fetchAllplayerstats,
  fetchBoxscore,
  getTotalscore,
  getRanking,
  getSelectedplayers,
  getHistoryplayers,
  getUserProfile,
  fetchPlayerstats,
  createPlayerstats
} = require("../controllers/fantasy_controller");

router.route("/fantasy/schedule")
  .get(fetchschedule);

router.route("/fantasy/history_schedule")
  .post(authentication(), getSchedule);

router.route("/fantasy/allplayerstats")
  .get(fetchAllplayerstats);

router.route("/fantasy/box_score")
  .get(fetchBoxscore);

router.route("/fantasy/total_score")
  .get(authentication(), getTotalscore);

router.route("/fantasy/ranking")
  .get(authentication(), getRanking);

router.route("/fantasy/selected_players")
  .post(authentication(), getSelectedplayers);

router.route("/fantasy/history_players")
  .post(authentication(), getHistoryplayers);

router.route("/user/profile")
  .get(authentication(), getUserProfile);

router.route("/fantasy/playerstats")
  .get(fetchPlayerstats);

router.route("/fantasy/create_playerstats")
  .get(createPlayerstats);

module.exports = router;
