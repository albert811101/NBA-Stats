require("dotenv").config();
const User = require("../models/user_model");

const signUp = async (req, res) => {
  const { name } = req.body;
  const { password } = req.body;

  if (!name || !password) {
    res.status(400).send({ error: "Request Error: name and password are required." });
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
    return { error: "Request Error: email and password are required.", status: 400 };
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

const getUserProfile = async (req, res) => {
  console.log(req.body);
  res.status(200).send({
    data: {
      name: req.user.name
    }
  });
};

module.exports = {
  signUp,
  signIn,
  getUserProfile
};
