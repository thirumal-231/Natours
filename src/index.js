import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "leaflet/dist/leaflet.css";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
    <Provider store={store}>
      <App />
    </Provider>
  </div>
);
