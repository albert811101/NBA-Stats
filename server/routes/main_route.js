const router = require("express").Router();

const {
  authentication
} = require("../../util/util");

const {
  getRanking,
  getTopplayers
} = require("../controllers/main_controller");

router.route("/fantasy/rank")
  .get(authentication(), getRanking);

router.route("/fantasy/top_players")
  .get(authentication(), getTopplayers);

module.exports = router;
