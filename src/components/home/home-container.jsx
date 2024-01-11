import "./home-container-styles.scss";
import EldenAnimatedBG from "../../assets/elden-ring-header-animated.webm";
import HoloElden from "../../assets/holo-elden2.png";
import { useTalentState } from "../../context/talent-context";
import { useEffect } from "react";
import Loading from "../loading/loading";
import GetData from "../../query/fetch_data";
export default function HomeContainer() {
  const { setSelectedTalent } = useTalentState();
  useEffect(() => {
    setSelectedTalent("");
  }, []);
  const data = GetData();
  if (data === "loading") {
    return <Loading />;
  }
  return (
    <div className="home-container">
      <div className="header-video-container">
        <div className="header">
          <img src={HoloElden} className="holo-elden" />
        </div>
        <video autoPlay loop muted className="video-container">
          <source src={EldenAnimatedBG} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
