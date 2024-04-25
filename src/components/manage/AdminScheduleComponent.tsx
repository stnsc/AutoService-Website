import { useEffect, useState } from "react";

interface Appointment {
  app_id: string;
  user_id: string;
  location_id: string;
  app_date: string;
  app_notes: string;
}

export default function AdminScheduleComponent() {
  const [appointments, setAppointments] = useState([]);

  function getAppointments() {
    fetch("http://localhost:3001/api/appointments/getAll")
      .then((response) => response.json())
      .then((result) => setAppointments(result))
      .catch((error) => console.error("Error fetching: " + error));
  }

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <>
      <div className="appointment-container">
        {appointments.map(
          ({
            app_id,
            user_id,
            location_id,
            app_date,
            app_notes,
          }: Appointment) => (
            <>
              <div className="appointment-card" key={app_id}>
                <h4>Appointment ID:{app_id}</h4>
                <h4>User ID:{user_id}</h4>
                <h4>Location ID:{location_id}</h4>
                <p>Date: {app_date}</p>
                <p>Notes: {app_notes}</p>
              </div>
            </>
          ),
        )}
      </div>
    </>
  );
}
