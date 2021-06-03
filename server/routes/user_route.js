const router = require("express").Router();

// const {
//   authentication
// } = require("../../util/util");

const {
  signUp,
  signIn
} = require("../controllers/user_controller");

router.route("/user/signup")
  .post(signUp);

router.route("/user/signin")
  .post(signIn);

module.exports = router;
