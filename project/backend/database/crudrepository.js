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

module.exports = {
  findAll: findAll,
  pool: pool,
};
