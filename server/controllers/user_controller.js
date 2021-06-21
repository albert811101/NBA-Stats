require("dotenv").config();
const validator = require("validator");
const User = require("../models/user_model");

const signUp = async (req, res) => {
  let { name } = req.body;
  const { password } = req.body;

  if (!name || !password) {
    res.status(400).send({ error: "Request Error: name and password are required." });
    return;
  }

  name = validator.escape(name);

  if (name.length > 12) {
    res.status(400).send({ error: "The number of name is limited to 12." });
    return;
  }

  if (password.length > 20) {
    res.status(400).send({ error: "The number of password is limited to 20." });
    return;
  }

  const result = await User.signUp(name, password);
  if (result.error) {
    res.status(403).send({ error: result.error });
    return;
  }

  const user = result.user;
  if (!user) {
    res.status(500).send({ error: "Database Query Error" });
    return;
  }

  res.status(200).send({
    data: {
      access_token: user.access_token,
      access_expired: user.access_expired,
      login_at: user.login_at,
      user: {
        id: user.id,
        name: user.name
      }
    }
  });
};

const nativeSignIn = async (name, password) => {
  if (!name || !password) {
    return { error: "Request Error: name and password are required.", status: 400 };
  }

  try {
    return await User.nativeSignIn(name, password);
  } catch (error) {
    return { error };
  }
};

const signIn = async (req, res) => {
  const data = req.body;

  const result = await nativeSignIn(data.name, data.password);

  if (result.error) {
    const statusCode = result.status ? result.status : 403;
    res.status(statusCode).send({ error: result.error });
    return;
  }

  const user = result.user;
  if (!user) {
    res.status(500).send({ error: "Database Query Error" });
    return;
  }

  res.status(200).send({
    data: {
      access_token: user.access_token,
      access_expired: user.access_expired,
      login_at: user.login_at,
      user: {
        id: user.id,
        provider: user.provider,
        name: user.name,
        email: user.email,
        picture: user.picture
      }
    }
  });
};

module.exports = {
  signUp,
  signIn
};
