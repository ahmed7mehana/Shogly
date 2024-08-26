import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import styles from "./App.module.css";

import "@fontsource/outfit";
import "@fontsource/roboto";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import { Provider } from 'react-redux'
import store from "./rtx/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className={styles.App}>
    <Navbar/>
        <Provider store={store}>
        <App />
        </Provider>
    </div>
  </React.StrictMode>
);
