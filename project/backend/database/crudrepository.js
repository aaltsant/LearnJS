const mysql = require("mysql");
const config = require("./config");

const pool = mysql.createPool(config);

function findAll(table) {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM ??", [table], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}

function findByID(table, id) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM ?? WHERE id = ?",
      [table, id],
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
function addQuestion(
  question,
  option_1,
  option_2,
  option_3,
  correct_answer,
  code_snippet,
  feedback_correct,
  feedback_incorrect,
) {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO questions (question, option_1, option_2, option_3, correct_answer, code_snippet, feedback_correct, feedback_incorrect) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        question,
        option_1,
        option_2,
        option_3,
        correct_answer,
        code_snippet,
        feedback_correct,
        feedback_incorrect,
      ],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      },
    );
  });
}

function updateByID(id, column, newValue) {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE questions SET ${column} = ? WHERE id = ?`,
      [newValue, id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      },
    );
  });
}

function findRandom() {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM questions ORDER BY RAND()",
      [],
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
  updateByID: updateByID,
  findRandom: findRandom,
  pool: pool,
};
