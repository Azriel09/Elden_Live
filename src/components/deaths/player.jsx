import React from "react";
import ReactPlayer from "react-player";
import "./player_styles.scss";
import Timestamps from "./timestamps";
const sheetID = import.meta.env.VITE_SHEET_ID;
export default function Player({ selectedStreamLink, data,selectedTalent,selectedStreamIndex }) {
  const ref = React.createRef();
  const stream_link =
    selectedStreamLink.replace("watch?v=", "embed/") + "?rel=0";
  // const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&sheet=Irys5`;

  // const handleClick = () => {
  //   fetch(url)
  //     .then((response) => response.text())
  //     .then((csvText) => handleResponse(csvText))
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };
  // function handleResponse(csvText) {
  //   csvToObjects(csvText);
  // }
  // function csvToObjects(csv) {
  //   const csvRows = csv.split("\n");

  //   let objects = [];
  //   let timestamp = [];
  //   let killah = [];
  //   let objtemp = {};

  //   for (let i = 0, max = csvRows.length; i < max; i++) {
  //     let tempo = {};
  //     let row = csvSplit(csvRows[i]);
  //     let hms = row[0];
  //     let a = hms.split(":");
  //     const totalSeconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
  //     tempo.value = Number(totalSeconds);
  //     objects.push(tempo);
  //     for (let j = 0, max = row.length; j < max; j++) {
  //       if (j === 0) {
  //         timestamp.push(row[j]);
  //       } else {
  //         killah.push(row[j]);
  //       }
  //     }
  //   }
  //   timestamp.map((time, i) => {
  //     objtemp[time] = killah[i];
  //   });
  //   console.log(objtemp);
  // }

  // function csvSplit(row) {
  //   return row.split(",").map((val) => val.substring(1, val.length - 1));
  // }

  return (
    <div className="player-container">
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
      <div>
        <Timestamps selectedStreamLink={selectedStreamLink} data={data} selectedTalent={selectedTalent} selectedStreamIndex={selectedStreamIndex}/>
      </div>
      <button onClick={() => handleClick()}>GG</button>
    </div>
  );
}
