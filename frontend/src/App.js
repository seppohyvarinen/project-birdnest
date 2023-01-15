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

// Main frontend function of the application
function App() {
  // List of all drones seen and also the filtered list which is Displayed in the UI
  const [drones, setDrones] = useState([]);
  const [filteredDrones, setFilteredDrones] = useState([]);

  //This useEffect has 2000ms interval so it calls the function getData() every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  /*
  This useEffect has the drones state as dependency so everytime it's updated,
  here the application handles filtering duplicates, updating timestamps, distances
  and ordering the list. Finally here the app sets the filteredDrones state which is displayed to the user.
  If a drone has been in the list for 10 minutes, it is removed from the filtered list.
  */
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

  /*
  Function for fetching the general report of the drones. Uses axios to fetch.
  This function also filters the violators and calls the getPilot function when needed.
  */
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

  /*
  Function for fetching the pilot data for drones that violated the no-flight zone. Uses axios to fetch.
  Here the application also sets the drones state which will contain data of all drones registered.
  */
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
