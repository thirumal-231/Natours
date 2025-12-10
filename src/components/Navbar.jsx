import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header className="header">
        <nav className="nav nav--tours">
          <a className="nav__el" href="/">
            All tours
          </a>
        </nav>
        <div className="header__logo">
          <a href="/">
            <img src="/img/logo-white.png" alt="Natours Logo" />
          </a>
        </div>
        <nav className="nav nav--user">
          <NavLink className="nav__el" to="/login">
            Log in
          </NavLink>
          <NavLink className="nav__el nav__el--cta" to="/signup">
            Sign up
          </NavLink>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
