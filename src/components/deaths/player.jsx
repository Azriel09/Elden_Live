import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "./player_styles.scss";
import { Box, Slider } from "@mui/material";
import moment from "moment";
const sheetID = import.meta.env.VITE_SHEET_ID;
const apiKeyYT = import.meta.env.VITE_YOUTUBE_API_KEY;
const apiKeyHolodex = import.meta.env.VITE_HOLODEX_API_KEY;
export default function Player({
  selectedStreamLink,
  data,
  selectedTalent,
  selectedStreamIndex,
}) {
  const ref = React.createRef();
  const stream_link =
    selectedStreamLink.replace("watch?v=", "embed/") + "?rel=0";

  const [killersArr, setKillersArr] = useState([]);
  const [timesArr, setTimesArr] = useState([]);
  const [boss, setBoss] = useState(false);
  const [npc, setNPC] = useState(false);
  const [max, setMax] = useState(0);
  const [sliderData, setSliderData] = useState([]);
  const [autoplay, setAutoplay] = useState(false);
  useEffect(() => {
    getID();
    const currentStreamData =
      data[selectedTalent][selectedStreamIndex].timestamps_killers;

    setKillersArr(Object.values(currentStreamData));
    setTimesArr(Object.keys(currentStreamData));

    // Converting timestamps into total number of seconds
    let arrays = [];
    Object.keys(
      data[selectedTalent][selectedStreamIndex].timestamps_killers
    ).map((time) => {
      const tempo = {};
      let hms = time;
      let a = hms.split(":");
      const totalSeconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
      tempo.value = Number(totalSeconds);
      arrays.push(tempo);
    });
    setSliderData(arrays);
  }, [selectedStreamLink]);

  function getID() {
    let url = selectedStreamLink.replace("watch?v=", "embed/");
    const id = url.split("/").pop();
    getVideoDuration(id);
  }

  const getVideoDuration = async (id) => {
    // Via Youtube API
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&key=${apiKeyYT}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const iso8601Duration = data.items[0].contentDetails.duration;
      const secondsDuration = moment.duration(iso8601Duration).asSeconds();
      setMax(secondsDuration);
    } catch (error) {
      console.error(error);

      // If error, use Holodex API
      // const url = `https://holodex.net/api/v2/videos/${id}`;
      // const options = {
      //   method: "GET",
      //   headers: { Accept: "application/json", "X-APIKEY": apiKeyHolodex },
      // };

      // try {
      //   const response = await fetch(url, options);
      //   const data = await response.json();
      //   const durationSeconds = data.duration;
      // setMax(secondsDuration)
      // } catch (error) {
      //   console.error(error);
      // }
    }
  };

  const checkBoss = (e) => {
    setAutoplay(true);
    let index = sliderData.findIndex((mark) => mark.value === e.target.value); //index of slider chosen
    console.log(killersArr[index]);
    ref.current.seekTo(e.target.value - 2);
    if (killersArr[index].includes("Boss")) {
      setBoss(true);
      setNPC(false);
    } else if (killersArr[index].includes("NPC")) {
      setBoss(false);
      setNPC(true);
    } else {
      setBoss(false);
      setNPC(false);
    }
  };

  function valueLabelFormat(value) {
    let index = sliderData.findIndex((mark) => mark.value === value);

    try {
      if (killersArr[index].includes("Boss")) {
        let death = killersArr[index].replace("Boss", "");

        return death;
      } else if (killersArr[index].includes("NPC")) {
        let death = killersArr[index].replace("NPC", "");
        return death;
      } else {
        return killersArr[index];
      }
    } catch (err) {
      console.log(err);
    }
  }

  function valuetext(value) {
    return sliderData.map((mark) => mark.label);
  }
  return (
    <>
      {sliderData ? (
        <div>
          <div className="react-player-wrapper">
            <ReactPlayer
              className="player"
              ref={ref}
              url={stream_link}
              width="100%"
              height="100%"
              controls
              playing={autoplay}
            />
          </div>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "absolute",
            }}
          >
            {sliderData.length >= 1 ? (
              <Slider
                aria-label="Restricted values"
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                valueLabelDisplay="on"
                step={null}
                min={0}
                max={max}
                onChange={(e) => checkBoss(e)}
                marks={sliderData}
                track={false}
                sx={[
                  {
                    marginTop: "20px",
                    paddingTop: "20px",
                    color: "rgba(0,0,0,0)",
                    // backgroundColor: "#323233",
                    width: "97%",

                    "& .MuiSlider-mark": {
                      backgroundColor: "red",
                      height: "17px",
                      width: "1px",
                      borderRadius: "1px",
                      "&:hover": {
                        width: "2px",
                        height: "20px",
                      },
                    },
                    "& .MuiSlider-thumb": {
                      color: "#b9b9bb",
                      height: 25,
                      width: "3px",
                    },
                    "& .MuiSlider-valueLabel": {
                      backgroundColor: "gray",
                    },
                  },
                  boss && {
                    "& .MuiSlider-valueLabel": {
                      backgroundColor: "lightblue",
                      color: "black",
                    },
                  },
                  npc && {
                    "& .MuiSlider-valueLabel": {
                      backgroundColor: "green",
                      color: "white",
                    },
                  },
                ]}
              />
            ) : (
              <h1>Deez Nuts</h1>
            )}
          </Box>
        </div>
      ) : null}
    </>
  );
}
