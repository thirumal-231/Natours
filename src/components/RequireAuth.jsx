import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  const { isAuthenticated, status } = useSelector((state) => state.auth);
  if (status === "loading") {
    return <p>Checking authentication...</p>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
