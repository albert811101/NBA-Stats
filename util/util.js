require("dotenv").config();
const User = require("../server/models/user_model");
const { TOKEN_SECRET } = process.env; // 30 days by seconds
const jwt = require("jsonwebtoken");

const authentication = () => {
  return async function (req, res, next) {
    let accessToken = req.get("Authorization");
    // console.log(accessToken);
    if (!accessToken) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }

    accessToken = accessToken.replace("Bearer ", "");
    if (accessToken === "null") {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }

    try {
      const user = jwt.verify(accessToken, TOKEN_SECRET);
      req.user = user;

      const userDetail = await User.getUserDetail(user.name);
      if (!userDetail) {
        res.status(403).send({ error: "Forbidden" });
      } else {
        req.user.id = userDetail.id;
        next();
      }
      return;
    } catch (err) {
      res.status(403).send({ error: "Forbidden" });
    }
  };
};

module.exports = {
  authentication
};
