require("dotenv").config();
const { NODE_ENV } = process.env;
const { createHash } = require("crypto");
const { users } = require("./fake_data");
const { pool } = require("../server/models/mysqlcon");

const encodePassword = function (password) {
  try {
    const hash = createHash("sha256");
    hash.update(password);
    return (hash.digest("hex"));
  } catch (error) { return error; }
};

async function _createFakeUser () {
  const encryptedUsers = users.map(user => {
    const encryptedUsers = {
      name: user.name,
      password: user.password ? encodePassword(user.password) : null,
      access_expired: user.access_expired,
      login_at: user.login_at,
      access_token: user.access_token
    };
    return encryptedUsers;
  });
  return await pool.query("INSERT INTO user (name, password, access_expired, login_at, access_token) VALUES ?", [encryptedUsers.map(x => Object.values(x))]);
}

async function createFakeData () {
  if (NODE_ENV !== "test") {
    console.log("Not in test env");
    return;
  }

  await _createFakeUser();
}

async function truncateFakeData () {
  if (NODE_ENV !== "test") {
    console.log("Not in test env");
    return;
  }
  const truncateTable = async (table) => {
    const conn = await pool.getConnection();
    await conn.query("START TRANSACTION");
    await conn.query(`TRUNCATE TABLE ${table}`);
    await conn.query("COMMIT");
    await conn.release();
  };
  const tables = ["user"];
  for (const table of tables) {
    await truncateTable(table);
  }
}

async function closeConnection () {
  return await pool.end();
}

module.exports = {
  createFakeData,
  truncateFakeData,
  closeConnection
};
