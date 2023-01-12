const axios = require("axios");

const express = require("express");
const app = express();

const port = process.env.PORT || 8080;

const translations = require("./routes/routes.js");

var cors = require("cors");
app.use(cors());
app.use(express.static("frontend/build"));
app.use(express.json());
app.use("/translations", translations);

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
