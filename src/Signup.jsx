import React from "react";

const Signup = () => {
  return (
    <div className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Create your account!</h2>
        <form className="form form--login">
          <div className="form form__group">
            <label class="form__label" htmlFor="name">
              Your name
            </label>
            <input
              className="form__input"
              id="name"
              type="text"
              placeholder="enter your name"
              required=""
            />
          </div>
          <div className="form form__group">
            <label class="form__label" htmlFor="email">
              Email address
            </label>
            <input
              className="form__input"
              id="email"
              type="email"
              placeholder="you@example.com"
              required=""
            />
          </div>
          <div className="form form__group ma-bt-md">
            <label class="form__label" htmlFor="password">
              Password
            </label>
            <input
              className="form__input"
              id="password"
              type="password"
              placeholder="••••••••"
              required=""
              minLength={8}
            />
          </div>
          <div className="form form__group ma-bt-md">
            <label class="form__label" htmlFor="passwordConfirm">
              Confirm Password
            </label>
            <input
              className="form__input"
              id="passwordConfirm"
              type="password"
              placeholder="••••••••"
              required=""
              minLength={8}
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
