const express = require("express");
const crudrepository = require("../database/crudrepository");
const router = express.Router();

// GET all questions
router.get("/api/questions", async (req, res) => {
  try {
    let results = await crudrepository.findAll();
    res.send(results);
  } catch (err) {
    // it goes here if db connection breaks
    // or there is syntax error in SQL asking
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/api/questions/:myId", async (req, res) => {
  const id = Number(req.params.myId);

  if (isNaN(id)) {
    res.status(400).json({
      error: "Invalid ID! ID Should be positive integer.",
      suggestion: "Ensure the ID is a valid integer!",
    });
  }

  try {
    let results = await crudrepository.findByID(id);

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
    res.status(500).json({ error: "Internal server error!"});
  }
});

module.exports = router;
