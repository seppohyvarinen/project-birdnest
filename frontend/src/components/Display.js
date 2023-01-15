import { useRef } from "react";
import "./display.css";

// Component for displaying the data
const Display = ({ filteredDrones }) => {
  /*
    useRef hooks are here used to mark certain divs in the Display component
    so the user can scroll to top or bottom with a press of a button
    */
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  // Function for scrolling to the top of the drone list
  const handleTopClick = () => {
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };
  // Function for scrolling to the bottom of the drone list

  const handleBottomClick = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div className="header">Recent Violations Of The No-Flight Zone:</div>
      {filteredDrones.length > 4 && (
        <div className="buttons">
          <button onClick={() => handleTopClick()}>Scroll To Top</button>
          <button onClick={() => handleBottomClick()}>Scroll To Bottom</button>
        </div>
      )}

      <div className="DisplayScreen">
        <div ref={topRef}></div>
        {filteredDrones.map((drone) => (
          <div className="pilotCard">
            <div className="data">
              <h3 className="name">
                {drone.firstName} {drone.lastName}
              </h3>
              <div className="contactInfo">
                <p>
                  email: <b>{drone.email}</b>
                </p>
                <p>
                  phone: <b>{drone.phoneNumber}</b>
                </p>
              </div>
              <div className="statistics">
                <p>
                  Distance:{" "}
                  <b>
                    {Math.round((drone.closestDistance / 1000) * 100) / 100}
                    meters
                  </b>
                </p>
                <p>
                  Last Seen: <b>{drone.createdDt.toLocaleString()}</b>
                </p>
              </div>
            </div>
            <div ref={bottomRef}></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Display;
