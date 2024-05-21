import { useEffect, useState } from "react";

interface Location {
  location_id: string;
  name: string;
  description: string;
  address: string;
  image: string;
  coords: string;
}

export default function AdminLocationComponent() {
  const [locations, setLocations] = useState([]);

  function getLocations() {
    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/locations`)
      .then((response) => response.json())
      .then((result) => setLocations(result))
      .catch((error) => console.error("Error fetching: " + error));
  }

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <>
      <div className="admin-location-container">
        <button className="admin-location-add btn btn-primary">
          Adaugare Locatie
        </button>
        {locations.map(
          ({
            location_id,
            name,
            description,
            address,
            image,
            coords,
          }: Location) => (
            <>
              <div className="location-card" key={location_id}>
                <img
                  className="location-image"
                  alt=""
                  style={{ backgroundImage: "url(" + image + ")" }}
                />

                <div className="location-body">
                  <h1 className="location-name">{name}</h1>
                  <p className="location-desc">
                    {description} {<br />} {address} {<br />} {coords}
                  </p>
                </div>

                <button className="btn btn-danger">Sterge Locatia</button>
              </div>
            </>
          ),
        )}
      </div>
    </>
  );
}
