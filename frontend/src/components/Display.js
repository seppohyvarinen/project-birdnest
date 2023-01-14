import "./display.css";

const Display = ({ filteredDrones }) => {
  return (
    <>
      <div className="header">Recent Violations Of The No-Flight Zone:</div>
      <div className="DisplayScreen">
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
          </div>
        ))}
      </div>
    </>
  );
};

export default Display;
