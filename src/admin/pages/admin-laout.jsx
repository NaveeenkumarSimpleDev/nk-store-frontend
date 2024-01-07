import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/navbar";
const AdminLayout = () => {
  return (
    <div className="flex ">
      <AdminNavbar />
      <section className="flex-grow ml-[8rem]">
        <Outlet />
      </section>
    </div>
  );
};

export default AdminLayout;
