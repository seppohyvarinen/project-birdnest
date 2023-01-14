import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
const convert = require("xml-js");

function App() {
  const [drones, setDrones] = useState([]);
  const [filteredDrones, setFilteredDrones] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let temp = [];
    drones.map((d) => {
      if (temp.length !== 0) {
        let canPush = true;
        temp.forEach((t) => {
          if (t.firstName === d.firstName) {
            console.log(t.createdDt.toLocaleString());
            t.createdDt = d.createdDt;
            console.log(t.createdDt.toLocaleString());

            if (t.distance > d.distance) {
              t.distance = d.distance;
            }
            canPush = false;
          }
        });
        canPush && temp.push(d);
      } else {
        temp.push(d);
      }
    });
    setFilteredDrones(temp);
  }, [drones]);

  const getData = async () => {
    try {
      let response = await axios.get("/drones", {});

      const parsed = JSON.parse(
        convert.xml2json(response.data, { compact: true, spaces: 2 })
      );
      let capturedDrones = parsed.report.capture.drone;

      let centerPoint = { lat: 250000, lon: 250000 };
      let radius = 100000;

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

    setDrones((drones) => [
      ...drones,
      {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber,
        closestDistance: v.distance,
        createdDt: new Date(),
      },
    ]);
  };

  return (
    <div className="App">
      <div>
        {filteredDrones.map((drone) => (
          <div>
            <h3>
              {drone.firstName} - {drone.lastName}
            </h3>
            <p>
              email: {drone.email} phone: {drone.phoneNumber}
            </p>
            <p>
              distance: {Math.round((drone.closestDistance / 1000) * 100) / 100}
              meters
            </p>
            <p>Last seen: {drone.createdDt.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
