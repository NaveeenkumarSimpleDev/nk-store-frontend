import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/navbar";
const AdminLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="mt-4 max-lg:mb-4 w-[8rem] lg:fixed ">
        <AdminNavbar />
      </div>

      <section className="flex-grow overflow-hidden py-3 xl:py-6 lg:ml-[8rem]">
        <Outlet />
      </section>
    </div>
  );
};

export default AdminLayout;
