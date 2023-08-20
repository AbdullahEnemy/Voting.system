import AdminHeader from "./AdminHeader";
import UserHeader from "./UserHeader";

export default function HeaderIndex(prop) {
  return <>{prop.role === "admin" ? <AdminHeader /> : <UserHeader />}</>;
}
