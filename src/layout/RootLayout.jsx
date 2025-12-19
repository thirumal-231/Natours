import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import { useDispatch } from "react-redux";
import { getMe } from "../store/authSlice";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "1.6rem",
            padding: "16px 20px",
            minWidth: "300px",
          },
        }}
      />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
