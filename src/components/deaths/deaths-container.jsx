import { useTalentState } from "../../context/talent-context";
import "../../assets/elden-ring-font.css";
import Player from "./player";
const apiKeyYT = import.meta.env.VITE_YOUTUBE_API_KEY;
export default function DeathsContainer() {
  const { selectedTalent } = useTalentState();
  console.log(selectedTalent);
  return <div>
    <Player/>
    <h1 style={{ fontFamily: "Elden Ring" }}>{selectedTalent}</h1>
  </div>
}
