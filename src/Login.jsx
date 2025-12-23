import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Login() {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, status, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (status === "succeeded" && isAuthenticated) {
      toast.success("Logged in successfully.");
      navigate("/", { replace: true });
    } else if (status === "failed") {
      toast.error(error);
    }
  }, [isAuthenticated, navigate, status, error]);

  return (
    <div className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>

        <form className="form form--login" onSubmit={handleLogin}>
          <div className="form form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              className="form__input"
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>

          <div className="form form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              className="form__input"
              id="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form__group">
            <button className="btn btn--green" disabled={status === "loading"}>
              {status === "loading" ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
