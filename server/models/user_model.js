require("dotenv").config();
const { createHash } = require("crypto");
const { pool } = require("./mysqlcon");
const { TOKEN_EXPIRE, TOKEN_SECRET } = process.env; // 30 days by seconds
const jwt = require("jsonwebtoken");

const encodePassword = function (password) {
  try {
    const hash = createHash("sha256");
    hash.update(password);
    return (hash.digest("hex"));
  } catch (error) { return error; }
};

const signUp = async (name, password) => {
  const conn = await pool.getConnection();
  try {
    await conn.query("START TRANSACTION");

    const names = await conn.query("SELECT name FROM user WHERE name = ? FOR UPDATE", [name]);
    if (names[0].length > 0) {
      await conn.query("COMMIT");
      return { error: "Name Already Exists" };
    }

    const loginAt = new Date();

    const user = {
      name: name,
      password: encodePassword(password),
      access_expired: TOKEN_EXPIRE,
      login_at: loginAt
    };

    const accessToken = jwt.sign({
      name: user.name
    }, TOKEN_SECRET);
    user.access_token = accessToken;

    const queryStr = "INSERT INTO user SET ?";
    const result = await conn.query(queryStr, user);

    user.id = result[0].insertId;
    await conn.query("COMMIT");
    return { user };
  } catch (error) {
    await conn.query("ROLLBACK");
    return { error };
  }
};

const nativeSignIn = async (name, password) => {
  const conn = await pool.getConnection();
  try {
    await conn.query("START TRANSACTION");
    const users = await conn.query("SELECT * FROM user WHERE name = ?", [name]);
    const user = users[0][0];
    console.log(user);
    if (user.password !== encodePassword(password)) {
      await conn.query("COMMIT");
      return { error: "Password is wrong" };
    }

    const loginAt = new Date();
    const accessToken = jwt.sign({
      name: user.name
    }, TOKEN_SECRET);

    const queryStr = "UPDATE user SET access_token = ?, access_expired = ?, login_at = ? WHERE user_id = ?";
    await conn.query(queryStr, [accessToken, TOKEN_EXPIRE, loginAt, user.user_id]);

    await conn.query("COMMIT");

    user.access_token = accessToken;
    user.login_at = loginAt;
    user.access_expired = TOKEN_EXPIRE;

    return { user };
  } catch (error) {
    await conn.query("ROLLBACK");
    return { error };
  }
};

const getUserDetail = async (name) => {
  try {
    const users = await pool.query("SELECT * FROM user WHERE name = ?", [name]);
    return users[0][0];
  } catch (e) {
    return null;
  }
};

module.exports = {
  signUp,
  nativeSignIn,
  getUserDetail
};
