const router = require("express").Router();
const {
  test
} = require("../controllers/test_controller");

router.route("/test/test")
  .get(test);

module.exports = router;
