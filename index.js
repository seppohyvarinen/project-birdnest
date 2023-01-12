const axios = require("axios");

const getDrones = async () => {
  try {
    var response = await axios.get(
      "https://assignments.reaktor.com/birdnest/drones"
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

getDrones();
