import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function ConfirmLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // logout success
    if (status === "idle" && !isAuthenticated) {
      toast.success("Logged out.");
      navigate("/login", { replace: true });
    }

    // logout failed
    if (status === "failed") {
      toast.error(error || "Logout failed");
    }
  }, [status, isAuthenticated, navigate, error]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await dispatch(logout()).unwrap();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed: ", err);
    }
  };

  return (
    <div className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">
          Are you sure you want to logout?
        </h2>

        <div
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          <button
            className="btn btn--white"
            onClick={() => navigate("/")}
            disabled={status === "loading"}
          >
            Cancel
          </button>

          <button
            className="btn btn--green"
            onClick={handleLogout}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}
