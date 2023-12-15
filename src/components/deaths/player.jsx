import React from "react";
import ReactPlayer from "react-player";
import "./player_styles.scss";
const sheetID = import.meta.env.VITE_SHEET_ID;
export default function Player({ selectedStreamLink }) {
  const ref = React.createRef();
  const stream_link = selectedStreamLink.replace("watch?v=", "embed/") + "?rel=0";
  return (<div className="player-container">
    <div className="react-player-wrapper">
      <ReactPlayer
        className="player"
        ref={ref}
        url={stream_link}
        width="100%"
        height="100%"
        controls
      />
    </div>
    </div>
  );
}
