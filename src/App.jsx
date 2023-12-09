import "./App.css";
import Sidenav from "./components/sidenav/Sidenav";
import { TalentProvider } from "./context/talent-context";
import Deaths from "./pages/Deaths";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
function App() {
  return (   <QueryClientProvider client={queryClient}>
    <TalentProvider>
   
        <Routes>
          <Route path="/" element={<Sidenav />}>
            <Route index element={<Home />} />
            <Route path="/deaths" element={<Deaths />} />
          </Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={true} position="top-right" />
   
 
    </TalentProvider>   </QueryClientProvider>
  );
}

export default App;
