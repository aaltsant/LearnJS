const mysql = require("mysql");
const config = require("./config");

const pool = mysql.createPool(config);

// Retrieve all locations
function findAll() {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM test_table",
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
  pool: pool,
};
