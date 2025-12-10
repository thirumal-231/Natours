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

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tour/:slug" element={<Tour />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;

// function App() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [showTour, setShowTour] = useState(false);
//   const [tour, setTour] = useState({});

//   function handleShowLogin() {
//     setShowLogin(true);
//   }
//   return (
//     <div>
//       <Navbar loginState={handleShowLogin} />
//       {!showTour ? (
//         <Main
//           showLogin={showLogin}
//           showTour={setShowTour}
//           tourDetails={setTour}
//         />
//       ) : (
//         <Tour data={tour} />
//       )}
//       <Footer />
//     </div>
//   );
// }

// export default App;
