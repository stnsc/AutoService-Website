import { useEffect, useState } from "react";
import UserScheduleComponent from "../components/manage/user/UserScheduleComponent.tsx";
import UserManageComponent from "../components/manage/user/UserManageComponent.tsx";
import AdminContactComponent from "../components/manage/AdminContactComponent.tsx";
import AdminScheduleComponent from "../components/manage/AdminScheduleComponent.tsx";
import AdminLocationComponent from "../components/manage/AdminLocationComponent.tsx";
import { motion, useIsPresent } from "framer-motion";

export default function ManagePage() {
  const isPresent = useIsPresent();

  const [page, setPage] = useState("");

  const renderPage = () => {
    switch (page) {
      case "userSchedule":
        return <UserScheduleComponent />;
      case "userManage":
        return <UserManageComponent />;
      case "adminContact":
        return <AdminContactComponent />;
      case "adminSchedule":
        return <AdminScheduleComponent />;
      case "adminLocation":
        return <AdminLocationComponent />;
      default:
        return <UserManageComponent />;
    }
  };

  const [isAdmin, setIsAdmin] = useState(false);
  function getAdmin() {
    const userID = Number(localStorage.getItem("user_id"));

    fetch(
      `http://${import.meta.env.VITE_HOST_IP}:3001/api/users/isAdmin?userID=${userID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.is_admin == true) setIsAdmin(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getAdmin();
  }, [isAdmin]);

  return (
    <>
      <div className="manage-container">
        <div className="manage-nav">
          <ul className="manage-ul list-unstyled">
            <li className="manage-li li-emphasis">
              <i className="bi bi-person-fill manage-icon"></i>Utilizator
            </li>
            <li className="manage-li" onClick={() => setPage("userManage")}>
              <i className="bi bi-person-vcard manage-icon"></i>Gestiune cont
            </li>
            <li className="manage-li" onClick={() => setPage("userSchedule")}>
              <i className="bi bi-calendar manage-icon"></i>Detalii programari
            </li>

            {isAdmin && (
              <>
                <li className="manage-li li-break"></li>

                <li className="manage-li li-emphasis">
                  <i className="bi bi-person-fill-lock manage-icon"></i>
                  Administrator
                </li>
                <li
                  className="manage-li"
                  onClick={() => setPage("adminContact")}
                >
                  <i className="bi bi-telephone-inbound manage-icon"></i>
                  Contactări
                </li>
                <li
                  className="manage-li"
                  onClick={() => setPage("adminSchedule")}
                >
                  <i className="bi bi-calendar manage-icon"></i>Programări
                </li>
                <li
                  className="manage-li"
                  onClick={() => setPage("adminLocation")}
                >
                  <i className="bi bi-map manage-icon"></i>Locații
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="manage-content">{renderPage()}</div>
      </div>

      <motion.div
        className="screen-wipe"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
      />
    </>
  );
}
