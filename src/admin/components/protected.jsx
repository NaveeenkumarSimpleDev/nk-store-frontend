import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../feautures/auth/authSlice";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const loggedInUser = useSelector(selectLoggedInUser);

  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
