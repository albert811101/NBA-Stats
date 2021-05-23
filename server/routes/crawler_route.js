const router = require("express").Router();
const {
  fetchPlayerstats,
  createPlayerbio,
  fetchStatsleader
} = require("../controllers/crawler_controller");

router.route("/crawler/playerstats")
  .get(fetchPlayerstats);

router.route("/crawler/statsleader")
  .get(fetchStatsleader);

router.route("/crawler/createPlayerbio")
  .get(createPlayerbio);

module.exports = router;
