import UserNameComponent from "./UserNameComponent.tsx";
import UserEmailComponent from "./UserEmailComponent.tsx";
import UserPasswordComponent from "./UserPasswordComponent.tsx";

export default function UserManageComponent() {
  return (
    <>
      <div className="user-manage-component">
        <UserNameComponent />
        <UserEmailComponent />
        <UserPasswordComponent />
      </div>
    </>
  );
}
