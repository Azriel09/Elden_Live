import { useTalentState } from "../../context/talent-context";
import "../../assets/elden-ring-font.css";
import Player from "./player";
import StreamSelection from "./stream_selection";
import "./death-container.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../loading/loading";
import GetData from "../../query/fetch_links";
const apiKeyYT = import.meta.env.VITE_YOUTUBE_API_KEY;

export default function DeathsContainer() {
  const navigate = useNavigate();
  const data = GetData();

  const { selectedTalent } = useTalentState();
  const [streamLinks, setStreamLinks] = useState([]);
  const [selectedStreamIndex, setSelectedStreamIndex] = useState(0);
  const [selectedStreamLink, setSelectedStreamLink] = useState("");
  useEffect(() => {
    if (!selectedTalent) {
      navigate("/");
    }
  }, []);
  if (data === "loading") {
    return <Loading />;
  }
  console.log(data);
  return (
    <div className="death-container">
      {/* Applies class using talent name for custom styling like header color and background */}
      <div className={`talent-header ${selectedTalent}`}>{selectedTalent}</div>
      <StreamSelection
        streamLinks={data.links}
        setSelectedStreamLink={setSelectedStreamLink}
        selectedStreamLink={selectedStreamLink}
        selectedStreamIndex={selectedStreamIndex}
        setSelectedStreamIndex={setSelectedStreamIndex}
      />
      <Player data={data.deaths} selectedStreamLink={selectedStreamLink} />
    </div>
  );
}
