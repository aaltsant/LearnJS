const express = require("express");
const crudrepository = require("../database/crudrepository");
const router = express.Router();

// GET random question
router.get("/rand", async (req, res) => {
  try {
    let results = await crudrepository.findRandom();

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET all questions
router.get("/", async (req, res) => {
  try {
    let results = await crudrepository.findAll("questions");
    res.send(results);
  } catch (err) {
    // it goes here if db connection breaks
    // or there is syntax error in SQL asking
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET question by ID
router.get("/:myId", async (req, res) => {
  const id = Number(req.params.myId);

  if (isNaN(id)) {
    res.status(400).json({
      error: "Invalid ID! ID Should be positive integer.",
      suggestion: "Ensure the ID is a valid integer!",
    });
  }

  try {
    let results = await crudrepository.findByID("questions", id);

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

// DELETE question by ID
router.delete("/api/questions/:myId", async (req, res) => {
  const id = Number(req.params.myId);

  if (isNaN(id)) {
    res.status(400).json({
      error: "Invalid ID format. ID should be a positive integer.",
      suggestion: "Ensure the ID is a valid integer.",
    });
  }

  try {
    let results = await crudrepository.deleteByID(id);

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

// POST new location
router.post("/", async (req, res) => {
  const question = req.body.question;
  const option_1 = req.body.option_1;
  const option_2 = req.body.option_2;
  const option_3 = req.body.option_3;
  const correct_answer = req.body.correct_answer;
  const code_snippet = req.body.code_snippet;
  const feedback_correct = req.body.feedback_correct;
  const feedback_incorrect = req.body.feedback_incorrect;

  try {
    let results = await crudrepository.addQuestion(
      question,
      option_1,
      option_2,
      option_3,
      correct_answer,
      code_snippet,
      feedback_correct,
      feedback_incorrect,
    );

    const newQuestion = {
      id: results.insertId,
      question: question,
      option_1: option_1,
      option_2: option_2,
      option_3: option_3,
      correct_answer: correct_answer,
      code_snippet: code_snippet,
      feedback_correct: feedback_correct,
      feedback_incorrect: feedback_incorrect,
    };

    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH
router.patch("/:myId", async (req, res) => {
  const id = req.params.myId;

  // I use use object.keys() to get the column key.
  const column = Object.keys(req.body)[0];
  // the column is saved as "column" so we can use it
  // to get the columns value aka newValue.
  const newValue = req.body[column];

  // this checks that the column is right
  // and also disables possibility of sql injection.
  const allowedColumns = [
    "question",
    "option_1",
    "option_2",
    "option_3",
    "correct_answer",
    "code_snippet",
    "feedback_correct",
    "feedback_incorrect",
  ];

  if (!allowedColumns.includes(column)) {
    res.status(404).json({
      error: `Column ${column} does not exist.`,
      suggestion: "Ensure the column is correct.",
    });
    return;
  }

  try {
    let results = await crudrepository.updateByID(id, column, newValue);

    // if there is no affectedRows, nothing is deleted
    if (results.affectedRows == 0) {
      res.status(404).json({
        error: `Location with ID ${id} does not exist.`,
        suggestion: "Ensure the location ID is correct.",
      });
      return;
    }

    let updatedLine = await crudrepository.findByID(id);

    res.status(200).json(updatedLine);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
