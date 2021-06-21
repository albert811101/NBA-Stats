const router = require("express").Router();

const {
  authentication
} = require("../../util/util");

const {
  getRanking,
  getTopPlayers
} = require("../controllers/main_controller");

router.route("/fantasy/rank")
  .get(authentication(), getRanking);

router.route("/fantasy/top_players")
  .get(authentication(), getTopPlayers);

module.exports = router;
