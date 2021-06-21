const router = require("express").Router();

const {
  signUp,
  signIn
} = require("../controllers/user_controller");

router.route("/user/signup")
  .post(signUp);

router.route("/user/signin")
  .post(signIn);

module.exports = router;
