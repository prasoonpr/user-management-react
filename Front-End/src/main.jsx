import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>
);
