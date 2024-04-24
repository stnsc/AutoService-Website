import { useEffect, useState } from "react";

export default function UserScheduleComponent() {
  const [appointments, setAppointments] = useState([]);
  const [userID, setUserID] = useState("");

  function getAppointments() {
    fetch(`http://localhost:3001/api/appointments/user?userID=${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => setAppointments(result))
      .catch((error) => console.error("Error fetching: " + error));
  }

  useEffect(() => {
    setUserID(localStorage.getItem("user_id") as string);
    if (userID) getAppointments();
  }, [userID]);

  return (
    <>
      <div className="appointment-container">
        {appointments.map(({ app_id, name, address, app_date }) => (
          <>
            <div className="appointment-card" key={app_id}>
              <h1>{name}</h1>
              <p>
                {address}, {app_date}
              </p>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
