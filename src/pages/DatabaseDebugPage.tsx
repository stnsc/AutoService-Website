import { useEffect, useState } from "react";

interface User {
  email: string;
  id: string;
  name: string;
}

export default function DatabaseDebugPage() {
  const [users, setUsers] = useState([]);

  function getUsers() {
    fetch("http://localhost:3001/api/users")
      .then((response) => response.json())
      .then((result) => setUsers(result))
      .catch((error) => console.error("Error fetching: " + error));
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="row row-cols-3">
        <h1>Baze de date utilizatori</h1>
        {users.map(({ email, id, name }: User) => (
          <div key={id} className="col">
            <div className="bg-primary p-3 rounded">
              <p>Nume: {name}</p>
              <p>Email: {email}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
