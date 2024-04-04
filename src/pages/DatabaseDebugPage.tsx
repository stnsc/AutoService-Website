import { useEffect, useState } from "react";

export default function DatabaseDebugPage() {
  const [users, setUsers] = useState("");

  function getUsers() {
    fetch("http://localhost:3001")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setUsers(data);
      });
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div>{users ? users : "Nu exista date disponibile."}</div>
    </>
  );
}
