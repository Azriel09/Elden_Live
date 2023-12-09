import { useTalentState } from "../../context/talent-context";
import "../../assets/elden-ring-font.css";
import Player from "./player";
import StreamSelection from "./stream_selection";
import "./death-container.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../loading/loading";
import GetLinks from "../../query/fetch_links";
const apiKeyYT = import.meta.env.VITE_YOUTUBE_API_KEY;

export default function DeathsContainer() {
  const { selectedTalent } = useTalentState();
  const navigate = useNavigate();
  const [streamLinks, setStreamLinks] = useState([]);
  const [streamSelected, setStreamSelected] = useState();
  useEffect(() => {
    if (!selectedTalent) {
      
      navigate("/");
    }
  }, []);

  const { status, data, error, isFetching } = GetLinks();
  if (status === "loading") {
    return <Loading />;
  }

  //   let tempo = []
  //    fetch("http://localhost:8000/test")
  //     .then((response) => response.json())
  //     .then((streams) => streams.map((stream) => {

  //         tempo.push(stream.links)

  //     }))
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  //    console.log(tempo)
  //    setStreamLinks(tempo)

  //  }, [selectedTalent])

  return (
    <div className="death-container">
      <StreamSelection streamLinks={data} />
      <Player />
      <h1 style={{ fontFamily: "Elden Ring" }}>{selectedTalent}</h1>
    </div>
  );
}
