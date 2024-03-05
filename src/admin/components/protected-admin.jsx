import { useDispatch, useSelector } from "react-redux";
import {
  selectLoggedInUser,
  checkAuthAsync,
} from "../../feautures/auth/authSlice";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedAdmin = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser?.role == "user" || !loggedInUser) {
      return navigate("/", {
        replace: true,
      });
    }
  }, []);

  return <div>{children}</div>;
};

export default ProtectedAdmin;
