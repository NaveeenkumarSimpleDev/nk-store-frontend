import { useDispatch, useSelector } from "react-redux";
import {
  checkAuthAsync,
  selectLoggedInUser,
} from "../../feautures/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedAdmin = ({ children }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!loggedInUser) {
  //     dispatch(checkAuthAsync());
  //   }
  // }, []);

  useEffect(() => {
    if (loggedInUser?.role == "user" || !loggedInUser) {
      return navigate("/", {
        replace: true,
      });
    }
  }, [loggedInUser]);

  return <div>{children}</div>;
};

export default ProtectedAdmin;
