/*
This function calculates distance between two points in 2 dimensional coordinate system.
rone object here represents drone which has positions y and x, and centerpoint represents the nest.
Centerpoint object has lat and lon properties.
*/

export const calculateDistance = (drone, centerPoint) => {
  let distance = Math.sqrt(
    Math.pow(drone.positionX._text - centerPoint.lon, 2) +
      Math.pow(drone.positionY._text - centerPoint.lat, 2)
  );

  return distance;
};

/*
This function checks whether certain amount of minutes has passed since given date.
Returns boolean value true if said amount of minutes has passed.
*/

export const minutesPassed = (date, minutes) => {
  let d = new Date(date);
  d.setMinutes(d.getMinutes() + minutes);

  return new Date() > d;
};

/*
This function filters the violating drones from the received report of all drones.
It has certain extremes which are first taken into account and then
uses Pythagorean theorem to check whether the drone is inside the circle
which radius is given as argument.
*/

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
