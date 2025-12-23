import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  const { user, isAuthenticated, status } = useSelector((state) => state.auth);
  if (status === "loading") {
    console.log(user, isAuthenticated, status);

    return <p>Checking authentication...</p>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
