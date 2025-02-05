import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import FavoriteContextProvider from "./context/FavoriteContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FavoriteContextProvider>
        <App />
      </FavoriteContextProvider>
    </BrowserRouter>
  </StrictMode>
);
