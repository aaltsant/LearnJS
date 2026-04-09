require("dotenv").config();
// import the express module
const express = require("express");
const router = require("./routes/questions");
const testrouter = require("./routes/test");
const userrouter = require("./routes/users");
const { pool } = require("./database/crudrepository");
// defines the port
const port = process.env.PORT || 3000;
// creates an instance of express app
const app = express();

// This is much needed middleware, without it req.body wont work
// It takes the json string and turns it into object and
// places it into req.body variable.
app.use(express.json());

// Old way
// app.use("/", router)
// this doenst work anymore as we need more than one router

// now when the routers automatically use /api/table_name
// you gotta just call /:myId in routes
// (finding just one question with id)
app.use("/api/questions", router);
app.use("/api/test", testrouter);
app.use("/api/users", userrouter);

const setupGracefulShutdown = (server) => {
  const shutdown = (signal) => {
    // telling if server was closed by dev or some other app
    console.info(`\nReceived ${signal} signal. Shutting down...`);

    pool.end(() => {
      server.close();
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM")); // system manager, some other application
  process.on("SIGINT", () => shutdown("SIGINT")); // ctrl-c
};

// Start the server and listen on the specified port
// doesnt make connection automatically
const server = app.listen(port, () => {
  console.info(`Example app listening on port ${port}`);
});

setupGracefulShutdown(server);
