import "./App.css";
import Sidenav from "./components/sidenav/Sidenav";

import Deaths from "./pages/Deaths";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { useTalentState } from "./context/talent-context";
import Boss from "./pages/Boss";
import Talent from "./pages/Talent";

function App() {
  const { selectedTalent } = useTalentState();
  return (
    <div className={selectedTalent}>
      <Routes>
        <Route path="/" element={<Sidenav />}>
          <Route index element={<Home />} />
          <Route path="/deaths" element={<Deaths />} />
          <Route path="/boss" element={<Boss />} />
          <Route path="/talent" element={<Talent />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
