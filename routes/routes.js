const express = require("express");
const axios = require("axios");
let drones = express.Router();

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

const getDrones = async () => {
  try {
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = drones;
