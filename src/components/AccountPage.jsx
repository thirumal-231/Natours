import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  resetPasswordUpdateStatus,
  resetUpdateStatus,
  updateMe,
  updatePassword,
} from "../store/authSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AccountPage() {
  const { user, isAuthenticated, status, updateStatus, passwordStatus, error } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [name, setName] = useState(user.name ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  useEffect(() => {
    if (updateStatus === "succeeded" && isAuthenticated) {
      toast.success("User details updated successfully.");
      setCurrentPassword("");
      setPassword("");
      setpasswordConfirm("");
      dispatch(resetUpdateStatus());
    } else if (updateStatus === "failed") {
      toast.error(error);
      dispatch(resetUpdateStatus());
    }
  }, [isAuthenticated, updateStatus, error, dispatch]);

  useEffect(() => {
    if (passwordStatus === "succeeded" && isAuthenticated) {
      toast.success("Password updated successfully.");
      dispatch(resetPasswordUpdateStatus());
    } else if (passwordStatus === "failed") {
      toast.error(error);
      dispatch(resetPasswordUpdateStatus());
    }
  }, [isAuthenticated, passwordStatus, error, dispatch]);

  if (status === "loading") {
    console.log(user, isAuthenticated, status);
    return <p>Checking authentication...</p>;
  }
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (photo) formData.append("photo", photo);
    dispatch(updateMe(formData));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    dispatch(updatePassword({ currentPassword, password, passwordConfirm }));
  };

  return (
    <main className="main">
      <div className="user-view">
        {/* SIDEBAR */}
        <nav className="user-view__menu">
          <ul className="side-nav">
            <li className="side-nav--active">
              <a href="#">
                <svg>
                  <use xlinkHref="img/icons.svg#icon-settings" />
                </svg>
                <span>Settings</span>
              </a>
            </li>

            <li>
              <Link to="/my-tours">
                <svg>
                  <use xlinkHref="img/icons.svg#icon-briefcase" />
                </svg>
                <span>My bookings</span>
              </Link>
            </li>

            <li>
              <a href="#">
                <svg>
                  <use xlinkHref="img/icons.svg#icon-star" />
                </svg>
                <span>My reviews</span>
              </a>
            </li>

            <li>
              <a href="#">
                <svg>
                  <use xlinkHref="img/icons.svg#icon-credit-card" />
                </svg>
                <span>Billing</span>
              </a>
            </li>
          </ul>

          {/* ADMIN NAV */}
          {user?.role === "admin" && (
            <div className="admin-nav">
              <h5 className="admin-nav__heading">Admin</h5>
              <ul className="side-nav">
                <li>
                  <a href="#">
                    <svg>
                      <use xlinkHref="img/icons.svg#icon-map" />
                    </svg>
                    <span>Manage tours</span>
                  </a>
                </li>

                <li>
                  <a href="#">
                    <svg>
                      <use xlinkHref="img/icons.svg#icon-users" />
                    </svg>
                    <span>Manage users</span>
                  </a>
                </li>

                <li>
                  <a href="#">
                    <svg>
                      <use xlinkHref="img/icons.svg#icon-star" />
                    </svg>
                    <span>Manage reviews</span>
                  </a>
                </li>

                <li>
                  <a href="#">
                    <svg>
                      <use xlinkHref="img/icons.svg#icon-briefcase" />
                    </svg>
                    <span>Manage bookings</span>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </nav>

        {/* CONTENT */}
        <div className="user-view__content">
          {/* USER DATA */}
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">
              Your account settings
            </h2>

            <form className="form form-user-data" onSubmit={handleUpdateUser}>
              <div className="form__group">
                <label className="form__label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className="form__input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form__group ma-bt-md">
                <label className="form__label" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  className="form__input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form__group form__photo-upload">
                <img className="form__user-photo" src={user.photo} alt="User" />
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  hidden
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                <label htmlFor="photo" className="btn-text">
                  Choose new photo
                </label>
              </div>

              <div className="form__group right">
                <button className="btn btn--small btn--green">
                  Save settings
                </button>
              </div>
            </form>
          </div>

          <div className="line">&nbsp;</div>

          {/* PASSWORD CHANGE */}
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Password change</h2>

            <form
              className="form form-user-settings"
              onSubmit={handlePasswordChange}
            >
              <div className="form__group">
                <label className="form__label" htmlFor="password-current">
                  Current password
                </label>
                <input
                  id="password-current"
                  className="form__input"
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  minLength={8}
                  required
                />
              </div>

              <div className="form__group">
                <label className="form__label" htmlFor="password">
                  New password
                </label>
                <input
                  id="password"
                  className="form__input"
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
              </div>

              <div className="form__group ma-bt-lg">
                <label className="form__label" htmlFor="password-confirm">
                  Confirm password
                </label>
                <input
                  id="password-confirm"
                  className="form__input"
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) => setpasswordConfirm(e.target.value)}
                  minLength={8}
                  required
                />
              </div>

              <div className="form__group right">
                <button className="btn btn--small btn--green">
                  Save password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
