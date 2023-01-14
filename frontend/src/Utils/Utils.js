export const calculateDistance = (drone) => {
  let distance = Math.sqrt(
    Math.pow(drone.positionX._text - 250000, 2) +
      Math.pow(drone.positionY._text - 250000, 2)
  );

  return distance;
};

export const minutesPassed = (date, minutes) => {
  let d = new Date(date);
  d.setMinutes(d.getMinutes() + minutes);

  return new Date() > d;
};
