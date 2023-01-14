import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Display from "./components/Display";

import {
  minutesPassed,
  calculateDistance,
  filterViolators,
} from "./Utils/Utils";
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
          if (t.firstName === d.firstName && t.lastName === d.lastName) {
            t.createdDt = d.createdDt;

            if (t.closestDistance > d.closestDistance) {
              t.closestDistance = d.closestDistance;
            }
            canPush = false;
          }
        });
        canPush && temp.push(d);
      } else {
        temp.push(d);
      }
    });

    for (let i = temp.length - 1; i >= 0; i--) {
      if (minutesPassed(temp[i].createdDt, 10)) {
        temp.splice(i, 1);
      }
    }

    temp.sort(function (a, b) {
      return new Date(b.createdDt) - new Date(a.createdDt);
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

      let violators = filterViolators(capturedDrones, centerPoint, radius);

      if (violators.length !== 0) {
        violators.forEach((v) => {
          getPilot(v);
        });
      }
    } catch (error) {
      console.error(error);
    }
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
      <Display filteredDrones={filteredDrones} />
    </div>
  );
}

export default App;
