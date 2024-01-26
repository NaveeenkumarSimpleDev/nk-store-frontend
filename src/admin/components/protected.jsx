import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../feautures/auth/authSlice";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const loggedInUser = useSelector(selectLoggedInUser);

  console.log({ loggedInUser });
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, []);

  if (!loggedInUser && mounted) {
    return <Navigate to="/login" replace />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
