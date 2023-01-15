export const calculateDistance = (drone, centerPoint) => {
  let distance = Math.sqrt(
    Math.pow(drone.positionX._text - centerPoint.lon, 2) +
      Math.pow(drone.positionY._text - centerPoint.lat, 2)
  );

  return distance;
};

export const minutesPassed = (date, minutes) => {
  let d = new Date(date);
  d.setMinutes(d.getMinutes() + minutes);

  return new Date() > d;
};

export const filterViolators = (capturedDrones, centerPoint, radius) => {
  let violators = capturedDrones.filter((drone) => {
    if (
      drone.positionX._text <= 350000 &&
      drone.positionX._text >= 150000 &&
      drone.positionY._text <= 350000 &&
      drone.positionY._text >= 150000
    ) {
      if (
        Math.pow(drone.positionX._text - centerPoint.lat, 2) +
          Math.pow(drone.positionY._text - centerPoint.lon, 2) <=
        Math.pow(radius, 2)
      ) {
        drone.distance = calculateDistance(drone, centerPoint);
        return true;
      }
    }

    return false;
  });
  return violators;
};
