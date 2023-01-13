import "./App.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
const convert = require("xml-js");

function App() {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  /*   useEffect(() => {
    console.log(
      "violators" +
        drones.map((d) => {
          console.log(d);
        })
    );
  }, [drones]); */

  const getData = async () => {
    try {
      var response = await axios.get("/drones", {});

      const parsed = JSON.parse(
        convert.xml2json(response.data, { compact: true, spaces: 2 })
      );
      let capturedDrones = parsed.report.capture.drone;
      console.log("alldrones: " + capturedDrones);

      let centerPoint = { lat: 250000, lon: 250000 };
      let radius = 100000;

      var violators = capturedDrones.filter((drone) => {
        if (
          drone.positionX._text <= 350000 &&
          drone.positionX._text >= 150000 &&
          drone.positionY._text <= 350000 &&
          drone.positionY._text >= 150000
        ) {
          if (
            Math.pow(2, drone.positionX._text - centerPoint.lat) +
              Math.pow(2, drone.positionY._text - centerPoint.lon) <=
            Math.pow(2, radius)
          ) {
            drone.distance = calculateDistance(drone);
            return true;
          }
        }

        return false;
      });

      if (violators.length !== 0) {
        violators.map((v) => {
          getPilot(v);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateDistance = (drone) => {
    let distance = Math.sqrt(
      Math.pow(drone.positionX._text - 250000, 2) +
        Math.pow(drone.positionY._text - 250000, 2)
    );

    return distance;
  };

  const getPilot = async (v) => {
    let response = await axios.get("/drones/pilotdata", {
      params: {
        serialnumber: v.serialNumber._text,
      },
    });
    console.log(response.data);

    setDrones((drones) => [
      ...drones,
      {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber,
        closestDistance: v.distance,
      },
    ]);
  };
  return (
    <div className="App">
      <div>
        {drones.map((drone) => (
          <div>
            <h3>
              {drone.firstName} - {drone.lastName}
            </h3>
            <p>
              email: {drone.email} phone: {drone.phoneNumber}
            </p>
            <p>distance: {drone.closestDistance / 100} meters</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
