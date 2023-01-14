const Display = ({ filteredDrones }) => {
  return (
    <div className="DisplayScreen">
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
              distance:
              {Math.round((drone.closestDistance / 1000) * 100) / 100}
              meters
            </p>
            <p>Last seen: {drone.createdDt.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
