import "./home-container-styles.scss";
import EldenAnimatedBG from "../../assets/elden-ring-header-animated.webm";
import HoloElden from "../../assets/holo-elden2.png";
export default function HomeContainer() {
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
