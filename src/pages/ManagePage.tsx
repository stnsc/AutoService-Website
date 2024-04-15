import { useState } from "react";
import UserScheduleComponent from "../components/manage/UserScheduleComponent.tsx";
import UserManageComponent from "../components/manage/UserManageComponent.tsx";
import AdminContactComponent from "../components/manage/AdminContactComponent.tsx";
import AdminScheduleComponent from "../components/manage/AdminScheduleComponent.tsx";
import AdminLocationComponent from "../components/manage/AdminLocationComponent.tsx";

export default function ManagePage() {
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
        return <UserScheduleComponent />;
    }
  };

  return (
    <>
      <div className="manage-container">
        <div className="manage-nav">
          <ul className="manage-ul list-unstyled">
            <li className="manage-li li-emphasis">
              <i className="bi bi-person-fill manage-icon"></i>Utilizator
            </li>
            <li className="manage-li" onClick={() => setPage("userSchedule")}>
              <i className="bi bi-calendar manage-icon"></i>Detalii programari
            </li>
            <li className="manage-li" onClick={() => setPage("userManage")}>
              <i className="bi bi-person-vcard manage-icon"></i>Gestiune cont
            </li>

            <li className="manage-li li-break"></li>

            <li className="manage-li li-emphasis">
              <i className="bi bi-person-fill-lock manage-icon"></i>
              Administrator
            </li>
            <li className="manage-li" onClick={() => setPage("adminContact")}>
              <i className="bi bi-telephone-inbound manage-icon"></i>Contactari
            </li>
            <li className="manage-li" onClick={() => setPage("adminSchedule")}>
              <i className="bi bi-calendar manage-icon"></i>Programari
            </li>
            <li className="manage-li" onClick={() => setPage("adminLocation")}>
              <i className="bi bi-map manage-icon"></i>Locatii
            </li>
          </ul>
        </div>
        <div className="manage-content">{renderPage()}</div>
      </div>
    </>
  );
}
