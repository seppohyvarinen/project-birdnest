const express = require("express");

let drones = express.Router();

drones.get("/", async (req, res) => {
  try {
    let drones = getDrones();
    res.send(drones);
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
});

const getDrones = async () => {
  try {
    let response = await axios.get(
      "https://assignments.reaktor.com/birdnest/drones"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
