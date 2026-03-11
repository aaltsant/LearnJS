const express = require("express");
const crudrepository = require("../database/crudrepository");
const router = express.Router();

router.get("/", (req, res) => {
  res.json("Toimii");
});

// GET all users
router.get("/api/users", async (req, res) => {
  try {
    let results = await crudrepository.findAll();
    res.send(results);
  } catch (err) {
    // it goes here if db connection breaks
    // or there is syntax error in SQL asking
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
