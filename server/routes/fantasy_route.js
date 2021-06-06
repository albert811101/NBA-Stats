const router = require("express").Router();

const {
  authentication
} = require("../../util/util");

const {
  fetchschedule,
  fetchAllplayerstats,
  fetchBoxscore,
  getTotalscore,
  getSelectedplayers,
  getUserProfile
} = require("../controllers/fantasy_controller");

router.route("/fantasy/schedule")
  .get(fetchschedule);

router.route("/fantasy/allplayerstats")
  .get(fetchAllplayerstats);

router.route("/fantasy/box_score")
  .get(fetchBoxscore);

router.route("/fantasy/total_score")
  .get(authentication(), getTotalscore);

router.route("/fantasy/selected_players")
  .post(authentication(), getSelectedplayers);

router.route("/user/profile")
  .get(authentication(), getUserProfile);

module.exports = router;