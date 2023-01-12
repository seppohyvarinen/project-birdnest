import "./App.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import XMLParser from "react-xml-parser";

function App() {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      var response = await axios.get("/drones", {});
      var parsed = new XMLParser().parseFromString(response.data);

      console.log(parsed.children[1].children);
    } catch (error) {
      console.error(error);
    }
  };
  return <div className="App"></div>;
}

export default App;
