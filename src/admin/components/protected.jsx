import { useDispatch, useSelector } from "react-redux";
import {
  selectLoggedInUser,
  checkAuthAsync,
} from "../../feautures/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      dispatch(checkAuthAsync());
    }
  }, []);

  useEffect(() => {
    if (!loggedInUser) {
      return navigate("/login", {
        state: { from: location.pathname + location.search },
      });
    }
  }, [loggedInUser]);

  return <div>{children}</div>;
};

export default ProtectedRoute;
