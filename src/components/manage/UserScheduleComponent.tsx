import { useEffect, useState } from "react";

interface Appointment {
  app_id: string;
  name: string;
  address: string;
  app_date: string;
}

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
        {appointments.map(
          ({ app_id, name, address, app_date }: Appointment) => (
            <div className="appointment-card" key={app_id}>
              <h3>Programarea #{app_id}</h3>
              <p>
                La service-ul <b>{name}</b>
              </p>
              <p>
                Locatie: <b>{address}</b>
              </p>
              <p>
                La data de: <b>{app_date.split("T")[0]}</b>, ora{" "}
                <b>{app_date.split("T")[1].substring(0, 5)}</b>
              </p>
              <button className="btn btn-primary">Anuleaza</button>
            </div>
          ),
        )}
      </div>
    </>
  );
}
