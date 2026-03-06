// express connections
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// database connection
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

// this is for finding right place automatically
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS locations
  (id INTEGER PRIMARY KEY, name TEXT, lat REAL, lng REAL)`);

  // Insert data — the ? placeholders prevent SQL injection
  db.run("INSERT INTO locations (name, lat, lng) VALUES (?, ?, ?)", [
    "Helsinki",
    60.1699,
    24.9384,
  ]);

  db.run("INSERT INTO locations (name, lat, lng) VALUES (?, ?, ?)", [
    "Tampere",
    61.4978,
    23.761,
  ]);
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/api/locations", (req, res) => {
  db.all("SELECT * FROM locations", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

process.on("SIGINT", () => {
  db.close();
  console.log("Shut down with SIGINT (CTRL + C)");
  process.exit(0);
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
