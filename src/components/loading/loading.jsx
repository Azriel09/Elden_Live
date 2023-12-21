import "./loading.scss";
import CoverIcon from "../../assets/cover-icon.png";
export default function Loading() {
  return (
    <div id="icon-container">
      <div id="icon">
        <img src={CoverIcon} id="img" />
      </div>
    </div>
  );
}
