import { useRef } from "react";
import "./display.css";

const Display = ({ filteredDrones }) => {
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  const handleTopClick = () => {
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };
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
