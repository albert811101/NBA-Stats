const router = require("express").Router();
const {
  fetchschedule,
  fetchAllplayerstats,
  getSelectedplayers
} = require("../controllers/fantasy_controller");

router.route("/fantasy/schedule")
  .get(fetchschedule);

router.route("/fantasy/allplayerstats")
  .get(fetchAllplayerstats);

router.route("/fantasy/selected_players")
  .post(getSelectedplayers);

module.exports = router;
