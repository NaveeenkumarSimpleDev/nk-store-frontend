import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../feautures/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      return navigate("/login", {
        replace: true,
      });
    }
  }, [loggedInUser]);

  return <div>{children}</div>;
};

export default ProtectedRoute;
