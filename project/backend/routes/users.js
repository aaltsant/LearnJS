const express = require("express");
const crudrepository = require("../database/crudrepository");
const userrouter = express.Router();

// GET all users (READ)
userrouter.get("/", async (req, res) => {
  try {
    let results = await crudrepository.findAll("users");
    res.send(results);
  } catch (err) {
    // it goes here if db connection breaks
    // or there is syntax error in SQL asking
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET leaderboard
userrouter.get("/top", async (req, res) => {
  try {
    let results = await crudrepository.findLeaderboard();
    res.send(results);
  } catch (err) {
    // it goes here if db connection breaks
    // or there is syntax error in SQL asking
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET user by ID
userrouter.get("/:myId", async (req, res) => {
  const id = Number(req.params.myId);

  if (isNaN(id)) {
    res.status(400).json({
      error: "Invalid ID! ID Should be positive integer.",
      suggestion: "Ensure the ID is a valid integer!",
    });
  }

  try {
    let results = await crudrepository.findByID("users", id);

    if (results.length == 0) {
      res.status(400).json({
        error: `Question with ID ${id} not found`,
        suggestion: "Verify the ID!",
      });
      return;
    }

    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error!" });
  }
});

// DELETE user by ID
userrouter.delete("/:myId", async (req, res) => {
  const id = Number(req.params.myId);

  if (isNaN(id)) {
    res.status(400).json({
      error: "Invalid ID format. ID should be a positive integer.",
      suggestion: "Ensure the ID is a valid integer.",
    });
  }

  try {
    let results = await crudrepository.deleteByID("users", id);

    // if there is no affectedRows, nothing is deleted
    if (results.affectedRows == 0) {
      res.status(404).json({
        error: `Location with ID ${id} does not exist.`,
        suggestion: "Ensure the location ID is correct.",
      });
      return;
    }

    res.status(204).json(results);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST new user (CREATE)
userrouter.post("/", async (req, res) => {
  const username = req.body.username;
  const score = req.body.score;
  const max_streak = req.body.max_streak;

  try {
    let results = await crudrepository.addUser(
      username,
      score,
      max_streak
    );

    const newQuestion = {
      id: results.insertId,
      username: username,
      score: score,
      max_streak
    };

    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH request (UPDATE)
userrouter.patch("/:myId", async (req, res) => {
  const id = req.params.myId;

  // I use object.keys() to get the column key.
  const column = Object.keys(req.body)[0];
  // the column is saved as "column" so we can use it
  // to get the columns value aka newValue.
  const newValue = req.body[column];

  // this checks that the column is right
  // and also disables possibility of sql injection.
  const allowedColumns = [
    "username",
    "score",
    "max_streak"
  ];

  if (!allowedColumns.includes(column)) {
    res.status(404).json({
      error: `Column ${column} does not exist.`,
      suggestion: "Ensure the column is correct.",
    });
    return;
  }

  try {
    let results = await crudrepository.updateByID("users", id, column, newValue);

    // if there is no affectedRows, nothing is updated
    if (results.affectedRows == 0) {
      res.status(404).json({
        error: `Location with ID ${id} does not exist.`,
        suggestion: "Ensure the location ID is correct.",
      });
      return;
    }

    let updatedLine = await crudrepository.findByID("users", id);

    res.status(200).json(updatedLine);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = userrouter;
