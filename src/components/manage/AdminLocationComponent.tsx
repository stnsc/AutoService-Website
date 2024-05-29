import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ModalComponent from "../ModalComponent.tsx";

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

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  function getLocations() {
    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/locations`)
      .then((response) => response.json())
      .then((result) => setLocations(result))
      .catch((error) => console.error("Error fetching: " + error));
  }

  //functie pentru a adauga o locatie
  function handleAdd(e: {
    preventDefault: () => void;
    target: HTMLFormElement | undefined;
  }) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    //validare form
    for (const key in data) {
      if (data[key] == "") {
        return;
      }
    }

    //fetch request pentru a adauga o locatie
    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/locations/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        getLocations();
        setAddModalOpen(false);
      });
  }

  //functie pentru a sterge o locatie
  const [locationData, setLocationData] = useState([]);
  function handleDelete() {
    const location_id = locationData[0];
    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/locations/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location_id }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        getLocations();
        setDeleteModalOpen(false);
      });
  }

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <>
      <div className="admin-location-container">
        <button
          className="admin-location-add btn btn-primary"
          onClick={() => setAddModalOpen(true)}
        >
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

                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setLocationData([location_id, name]);
                    setDeleteModalOpen(true);
                  }}
                >
                  Sterge Locatia
                </button>
              </div>
            </>
          ),
        )}
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isAddModalOpen && (
          <ModalComponent onClose={() => setAddModalOpen(false)}>
            <h2 className="admin-location-title">Adaugare Locatie</h2>
            <form
              method="post"
              className="form-add-location"
              onSubmit={handleAdd}
            >
              <div className="form-floating">
                <input type="text" name="name" className="form-control" />
                <label htmlFor="floatingInput">Nume Locatie</label>
              </div>
              <div className="form-floating">
                <input type="text" name="address" className="form-control" />
                <label htmlFor="floatingInput">Adresa</label>
              </div>
              <div className="form-floating">
                <input type="text" name="image" className="form-control" />
                <label htmlFor="floatingInput">Imagine (link de imgur)</label>
              </div>
              <div className="form-floating">
                <input type="text" name="coords" className="form-control" />
                <label htmlFor="floatingInput">Coordonate</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  name="description"
                  className="form-control"
                />
                <label htmlFor="floatingInput">Descriere</label>
              </div>
              <button className="btn btn-primary">Adaugare</button>
            </form>
          </ModalComponent>
        )}
        {isDeleteModalOpen && (
          <ModalComponent onClose={() => setDeleteModalOpen(false)}>
            <h2 className="admin-location-title">Sterge Locatie</h2>
            <h3>
              Esti sigur ca vrei sa stergi locatia <b>{locationData[1]}</b>?
            </h3>
            <div className="admin-button-div">
              <button
                className="btn btn-danger"
                onClick={() => setDeleteModalOpen(false)}
              >
                Nu
              </button>
              <button className="btn btn-primary" onClick={handleDelete}>
                Da
              </button>
            </div>
          </ModalComponent>
        )}
      </AnimatePresence>
    </>
  );
}
