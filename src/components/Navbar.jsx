import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { useState } from "react";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <header className="header">
        <nav className="nav nav--tours">
          <NavLink className="nav__el" href="/">
            All tours
          </NavLink>
        </nav>
        <div className="header__logo">
          <a href="/">
            <img src="/img/logo-white.png" alt="Natours Logo" />
          </a>
        </div>
        <nav className="nav nav--user">
          {!isAuthenticated ? (
            <>
              <NavLink className="nav__el" to="/login">
                Log in
              </NavLink>
              <NavLink className="nav__el nav__el--cta" to="/signup">
                Sign up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                className="nav__el nav__el--logout"
                onClick={() =>
                  navigate("/logout", { state: { background: location } })
                }
                to="/logout"
              >
                Log out
              </NavLink>
              <NavLink className="nav__el" to="/me">
                <img
                  className="nav__user-img"
                  src="/img/users/default.jpg"
                  alt="Photo of Thirumal"
                />
                <span>{user.name}</span>
              </NavLink>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
