import { useDispatch, useSelector } from "react-redux";
import {
  selectLoggedInUser,
  checkAuthAsync,
} from "../../feautures/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedAdmin = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
    dispatch(checkAuthAsync());
  }, []);

  if (!loggedInUser && mounted) {
    return navigate("/login", {
      state: { from: location.pathname + location.search },
    });
  }

  if (loggedInUser?.role === "user") {
    return navigate("/");
  }

  return <div>{children}</div>;
};

export default ProtectedAdmin;
