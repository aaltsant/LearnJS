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
function deleteByID(table, id) {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM ?? WHERE id = ?", [table, id], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}

// Post new question
function addQuestion(
  table,
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
      "INSERT INTO ?? (question, option_1, option_2, option_3, correct_answer, code_snippet, feedback_correct, feedback_incorrect) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        table,
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

// Post new user
function addUser(username, score, max_streak) {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO users (username, score, max_streak) VALUES (?, ?, ?)",
      [username, score, max_streak],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      },
    );
  });
}

// PATCH request
function updateByID(table, id, column, newValue) {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE ?? SET ${column} = ? WHERE id = ?`,
      [table, newValue, id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      },
    );
  });
}

// GET all from questions in random order
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

// GET from test in random order
function findRandom() {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM test ORDER BY RAND() LIMIT 5",
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

// GET leaderboard top 10
function findLeaderboard() {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users ORDER BY score DESC LIMIT 10",
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
  addUser: addUser,
  findLeaderboard: findLeaderboard,
  pool: pool,
};
