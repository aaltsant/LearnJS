const mysql = require("mysql");
const config = require("./config");

// create pool of connections
const pool = mysql.createPool(config);

/**
 * this function makes sql query to get everything from chosen table
 * @param {string} table: table that is sent from routes
 * @returns Promise
 */
function findAll(table) {
  return new Promise((resolve, reject) => {
    // using placeholders to prevent sql injection
    pool.query("SELECT * FROM ??", [table], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}

/**
 * this function makes sql query to get row with id from chosen table
 * @param {string} table: table that is sent from routes
 * @param {number} id: id you want to get from database
 * @returns Promise
 */
function findByID(table, id) {
  return new Promise((resolve, reject) => {
    pool.query(
      // ?? is used for tablename and ? for value
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

/**
 * this function makes sql query to delete row with id from chosen table
 * @param {string} table: table that is sent from routes
 * @param {number} id: id you want to delete from database
 * @returns Promise
 */
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

/**
 * This function makes sql query to add new questions to chosen table
 * @param {string} table: table you want to update
 * @param {string} question: new question you want to add
 * @param {string} option_1: answer option 1
 * @param {string} option_2: answer option 2
 * @param {string} option_3: answer option 3
 * @param {string} correct_answer: correct answer to questions
 * @param {string} code_snippet: null, else question contains code
 * @param {string} feedback_correct: feedback if asnwered correctly
 * @param {string} feedback_incorrect: feedback if asnwered incorrectly
 * @returns Promise
 */
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

/**
 * This function adds new user to users table
 * @param {string} username: given username
 * @param {number} score: users points
 * @param {number} max_streak: users best streak
 * @returns
 */
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

/**
 * This function updates specific row in chosen table by id
 * @param {string} table: table you want to update
 * @param {number} id: id from the row you want to change
 * @param {string} column: column you want to update
 * @param {string} newValue: new value for the chosen column
 * @returns
 */
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

/**
 * This function gets all questions from questions table
 * and puts them in random order so noone cannot remember the question order
 * @returns Promise
 */
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

/**
 * This function gets given amount of questions from test table
 * and puts them in random order so noone cannot remember the question order
 * @returns Promise
 */
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

/**
 * This function gets leaderboard top 10
 * @returns Promise
 */
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
