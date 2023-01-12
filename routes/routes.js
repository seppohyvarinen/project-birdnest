const getDrones = async () => {
  try {
    var response = await axios.get(
      "https://assignments.reaktor.com/birdnest/drones"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
