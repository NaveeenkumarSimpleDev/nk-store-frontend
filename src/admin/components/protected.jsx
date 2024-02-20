import { useDispatch, useSelector } from "react-redux";
import {
  selectLoggedInUser,
  checkAuthAsync,
} from "../../feautures/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingIndigator from "../../components/loading-indicator";

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

  // if (!loggedInUser) {
  //   return (
  //     <LoadingIndigator className="w-full fixed h-screen inset-0 flex items-center justify-center" />
  //   );
  // }

  if (!loggedInUser) {
    return navigate("/login", {
      state: { from: location.pathname + location.search },
    });
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
