import "./display.css";

const Display = ({ filteredDrones }) => {
  return (
    <div className="DisplayScreen">
      <div>
        {filteredDrones.map((drone) => (
          <div className="pilotCard">
            <div className="data">
              <h3 className="name">
                {drone.firstName} {drone.lastName}
              </h3>
              <div className="contactInfo">
                <p>email: {drone.email}</p>
                <p>phone: {drone.phoneNumber}</p>
              </div>
              <div className="statistics">
                <p>
                  Closest confirmed distance:
                  {Math.round((drone.closestDistance / 1000) * 100) / 100}
                  meters
                </p>
                <p>Last Seen: {drone.createdDt.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
