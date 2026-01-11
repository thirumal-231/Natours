import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "./store/authSlice";
import toast from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, status, error } = useSelector((state) => state.auth);

  const handleSignup = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    dispatch(signup({ name, email, password, passwordConfirm }));
  };

  useEffect(() => {
    if (!isSubmitting) return;
    if (status === "succeeded" && isAuthenticated) {
      toast.success("Account created successfully!");
      navigate("/", { replace: true });
    } else if (status === "failed") {
      toast.error(error);
      setIsSubmitting(false);
    }
  }, [isAuthenticated, navigate, status, error, isSubmitting]);

  return (
    <div className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Create your account!</h2>
        <form className="form form--signup" onSubmit={handleSignup}>
          {" "}
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Your name
            </label>
            <input
              className="form__input"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="enter your name"
              required
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              className="form__input"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              className="form__input"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="passwordConfirm">
              Confirm Password
            </label>
            <input
              className="form__input"
              id="passwordConfirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green" disabled={status === "loading"}>
              {status === "loading" ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
