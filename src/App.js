import Main from "./Main";
import Login from "./Login";
import RootLayout from "./layout/RootLayout";
import Signup from "./Signup";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Tour from "./Tour";
import RequireAuth from "./components/RequireAuth";
import ConfirmLogout from "./components/ConfirmLogout";
import AccountPage from "./components/AccountPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/* public routes */}
        <Route index element={<Main />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<ConfirmLogout />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="me" element={<AccountPage />} />
          <Route path="tour/:slug" element={<Tour />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
