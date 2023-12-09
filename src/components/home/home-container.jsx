import "./home-container-styles.scss";
import EldenAnimatedBG from "../../assets/elden-ring-header-animated.webm";
import HoloElden from "../../assets/holo-elden2.png";
import { useTalentState } from "../../context/talent-context";
import { useEffect } from "react";
import Loading from "../loading/loading";
import GetLinks from "../../query/fetch_links";
export default function HomeContainer() {
  const { setSelectedTalent } = useTalentState();
  useEffect(() => {
    setSelectedTalent("");
  }, []);
  const { status, data, error, isFetching } = GetLinks();
  if (status === "loading") {
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
