import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { PrimeReactProvider } from "primereact/api";
import App from "./App";
// import "primeicons/primeicons.css"; //icons
// import "primeflex/primeflex.css"; // flex
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);
