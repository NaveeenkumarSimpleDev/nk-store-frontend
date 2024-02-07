import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="flex lg:flex-col pr-4 mr-4 h-auto lg:h-screen z-10  lg:border-r font-semibold">
      <NavLink
        style={({ isActive }) => {
          if (isActive) {
            return {
              backgroundColor: "black",
              color: "white",
              fontWeight: 600,
            };
          }
        }}
        to="/admin/products"
        className="py-2 px-4 rounded-sm"
      >
        Products
      </NavLink>
      <NavLink
        style={({ isActive }) => {
          if (isActive) {
            return {
              backgroundColor: "black",
              color: "white",
              fontWeight: 600,
            };
          }
        }}
        className="py-2 px-4 rounded-sm"
        to="/admin/orders"
      >
        Orders
      </NavLink>
    </nav>
  );
};

export default AdminNavbar;
