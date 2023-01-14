const express = require("express");
const axios = require("axios");
let drones = express.Router();

/*
Backend route for fetching the report on drones.
Sends the report as response data to the frontend or alternatively 404 statuscode.
*/

drones.get("/", async (req, res) => {
  try {
    let response = await axios.get(
      "https://assignments.reaktor.com/birdnest/drones"
    );
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

/*
Backend route for fetching pilot data on pilots that have violated the no-flight zone.
Sends the report as response data to the frontend or alternatively 404 statuscode.
*/
drones.get("/pilotdata", async (req, res) => {
  try {
    console.log(req.query);

    let response = await axios.get(
      "https://assignments.reaktor.com/birdnest/pilots/" +
        req.query.serialnumber
    );

    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

module.exports = drones;
