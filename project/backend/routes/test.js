const express = require("express");
const crudrepository = require("../database/crudrepository");
const testrouter = express.Router();

// GET all testquestions
testrouter.get("/", async (req, res) => {
  try {
    let results = await crudrepository.findAll("test");
    res.send(results);
  } catch (err) {
    // it goes here if db connection breaks
    // or there is syntax error in SQL asking
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = testrouter;
