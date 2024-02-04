import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/navbar";
const AdminLayout = () => {
  return (
    <div className="flex">
      <div className="mt-4  w-[8rem]">
        <AdminNavbar />
      </div>

      <section className="flex-grow overflow-hidden">
        <Outlet />
      </section>
    </div>
  );
};

export default AdminLayout;
