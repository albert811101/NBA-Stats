const router = require("express").Router();

const {
  authentication
} = require("../../util/util");

const {
  fetchschedule,
  fetchAllplayerstats,
  fetchBoxscore,
  getTotalscore,
  getRanking,
  getSelectedplayers,
  getUserProfile,
  fetchPlayerstats
} = require("../controllers/fantasy_controller");

router.route("/fantasy/schedule")
  .get(fetchschedule);

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

router.route("/user/profile")
  .get(authentication(), getUserProfile);

router.route("/fantasy/playerstats")
  .get(fetchPlayerstats);

module.exports = router;
