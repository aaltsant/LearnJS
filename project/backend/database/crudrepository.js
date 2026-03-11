const mysql = require("mysql");
const config = require("./config");

const pool = mysql.createPool(config);

function findAll() {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM questions", (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}

function findByID(id) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM questions WHERE id = ?",
      [id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      },
    );
  });
}

module.exports = {
  findAll: findAll,
  findByID: findByID,
  pool: pool,
};
