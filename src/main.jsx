import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { TalentProvider } from "./context/talent-context.jsx";
import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TalentProvider>
          <PrimeReactProvider>
            <App />
          </PrimeReactProvider>
        </TalentProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
