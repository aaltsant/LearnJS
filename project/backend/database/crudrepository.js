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

// Delete location by ID
function deleteByID(id) {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM questions WHERE id = ?", [id], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}

// Post new question
function addQuestion(question_text, option_1, option_2, option_3, correct_answer) {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO questions (question_text, option_1, option_2, option_3, correct_answer) VALUES (?, ?, ?, ?, ?)",
      [question_text, option_1, option_2, option_3, correct_answer],
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
  deleteByID: deleteByID,
  addQuestion: addQuestion,
  pool: pool,
};
