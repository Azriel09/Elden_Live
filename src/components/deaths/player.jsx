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
  const [sliderConfigs, setSliderConfigs] = useState({
    max: 0,
    sliderData: [],
    boss: false,
    npc: false,
    killersArr: Object.values(
      data[selectedTalent][selectedStreamIndex].timestamps_killers
    ),
    timesArr: Object.keys(
      data[selectedTalent][selectedStreamIndex].timestamps_killers
    ),
  });

  useEffect(() => {
    getID();

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
    setSliderConfigs({
      ...sliderConfigs, // Spread the current state
      sliderData: arrays, // Update the 'name' property
    });
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
      setSliderConfigs({ ...sliderConfigs, max: secondsDuration });
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
      //   setSliderConfigs({ ...sliderConfigs, max: durationSeconds });
      // } catch (error) {
      //   console.error(error);
      // }
    }
  };

  const checkBoss = (e) => {
    let index = sliderConfigs.sliderData.findIndex(
      (mark) => mark.value === e.target.value
    ); //index of slider chosen

    ref.current.seekTo(e.target.value - 2);
    if (sliderConfigs.killersArr[index].includes("Boss")) {
      setSliderConfigs({ ...sliderConfigs, boss: true });
      setSliderConfigs({ ...sliderConfigs, npc: false });
    } else if (sliderConfigs.killersArr[index].includes("NPC")) {
      setSliderConfigs({ ...sliderConfigs, npc: true });
      setSliderConfigs({ ...sliderConfigs, boss: false });
    } else {
      setSliderConfigs({ ...sliderConfigs, boss: false });
      setSliderConfigs({ ...sliderConfigs, npc: false });
    }
  };

  function valueLabelFormat(value) {
    let index = sliderConfigs.sliderData.findIndex(
      (mark) => mark.value === value
    );

    try {
      if (sliderConfigs.killersArr[index].includes("Boss")) {
        let death = sliderConfigs.killersArr[index].replace("Boss", "");

        return death;
      } else if (sliderConfigs.killersArr[index].includes("NPC")) {
        let death = sliderConfigs.killersArr[index].replace("NPC", "");
        return death;
      } else {
        return sliderConfigs.killersArr[index];
      }
    } catch (err) {
      console.log(err);
    }
  }

  function valuetext(value) {
    return sliderConfigs.sliderData.map((mark) => mark.label);
  }
  return (
    <>
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
        }}
      >
        {sliderConfigs.sliderData.length >= 1 ? (
          <Slider
            aria-label="Restricted values"
            valueLabelFormat={valueLabelFormat}
            getAriaValueText={valuetext}
            valueLabelDisplay="on"
            step={null}
            min={0}
            max={sliderConfigs.max}
            onChange={(e) => checkBoss(e)}
            marks={sliderConfigs.sliderData}
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
              sliderConfigs.boss && {
                "& .MuiSlider-valueLabel": {
                  backgroundColor: "lightblue",
                  color: "black",
                },
              },
              sliderConfigs.npc && {
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
    </>
  );
}
