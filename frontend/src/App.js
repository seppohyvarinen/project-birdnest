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
  useEffect(() => {
    console.log(
      "violators" +
        drones.map((d) => {
          console.log(d);
        })
    );
  }, [drones]);

  const getData = async () => {
    try {
      var response = await axios.get("/drones", {});

      const parsed = JSON.parse(
        convert.xml2json(response.data, { compact: true, spaces: 2 })
      );
      let capturedDrones = parsed.report.capture.drone;
      console.log(capturedDrones);

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
            return true;
          }
        }

        return false;
      });

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
    console.log(response.data);

    setDrones((drones) => [
      ...drones,
      {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
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
            <p>{drone.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
