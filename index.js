const express = require("express");
const app = express();
var bodyParser = require("body-parser");

const port = process.env.PORT || 8080;

const drones = require("./routes/routes.js");

let cors = require("cors");
app.use(cors());
app.use(express.static("frontend/build"));
app.use(express.json());
app.use(bodyParser.json());
app.use("/drones", drones);

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
