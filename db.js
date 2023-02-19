require("dotenv").config();

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
});

function db(sql, param) {
  return new Promise((resolve, reject) => {
    pool
      .query(sql, param)
      .then(([res]) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = db;