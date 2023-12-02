import "./App.css";
import Sidenav from "./components/sidenav/Sidenav";
import { TalentProvider } from "./context/talent-context";
import Deaths from "./pages/Deaths";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <TalentProvider>
      <Routes>
        <Route path="/" element={<Sidenav />}>
          <Route index element={<Home />} />
          <Route path="/deaths" element={<Deaths />} />
        </Route>
      </Routes>
    </TalentProvider>
  );
}

export default App;
