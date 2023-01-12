import "./App.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
const convert = require("xml-js");

function App() {
  const [drones, setDrones] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      var response = await axios.get("/drones", {});

      const parsed = JSON.parse(
        convert.xml2json(response.data, { compact: true, spaces: 2 })
      );
      let capturedDrones = parsed.report.capture.drone;
      console.log(capturedDrones);

      var violators = capturedDrones.filter((drone) => {
        if (drone.positionX._text < 150000) {
          return false;
        }
        if (drone.positionX._text > 350000) {
          return false;
        }
        if (drone.positionY._text < 150000) {
          return false;
        }
        if (drone.positionY._text > 350000) {
          return false;
        }
        return true;
      });
      console.log(violators);
    } catch (error) {
      console.error(error);
    }
  };
  return <div className="App">{drones}</div>;
}

export default App;
