require("dotenv").config();
const mysql = require("mysql2/promise");
const env = process.env.NODE_ENV || "test";
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_HOST_TEST, DB_USER_TEST, DB_PASSWORD_TEST, DB_DATABASE_TEST } = process.env;

// const pool = mysql.createPool({
//   connectionLimit: 65,
//   host: DB_HOST,
//   user: DB_USER,
//   password: DB_PASSWORD,
//   database: DB_DATABASE
// });

const mysqlConfig = {
  production: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
  },
  test: {
    host: DB_HOST_TEST,
    user: DB_USER_TEST,
    password: DB_PASSWORD_TEST,
    database: DB_DATABASE_TEST
  }
};

const mysqlEnv = mysqlConfig[env];
mysqlEnv.waitForConnections = true;
mysqlEnv.connectionLimit = 65;

const pool = mysql.createPool(mysqlConfig[env]);

module.exports = {
  pool
};
