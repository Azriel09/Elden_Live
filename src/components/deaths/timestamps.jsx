import { useState, useEffect } from "react";
import { Box, Slider } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

const apiKeyYT = import.meta.env.VITE_YOUTUBE_API_KEY;
const apiKeyHolodex = import.meta.env.VITE_HOLODEX_API_KEY;
export default function Timestamps({
  selectedStreamLink,
  data,
  selectedTalent,
  selectedStreamIndex,
}) {
  const [max, setMax] = useState();
  const [sliderData, setSliderData] = useState([]);
  const [boss, setBoss] = useState(false);
  const [npc, setNPC] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  let timesArr;
  let killersArr;

  useEffect(() => {
    const selectedStreamData =
      data[selectedTalent][selectedStreamIndex].timestamps_killers;
    timesArr = Object.keys(selectedStreamData);
    killersArr = Object.values(selectedStreamData);
    
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
      const url = `https://holodex.net/api/v2/videos/${id}`;
      const options = {
        method: "GET",
        headers: { Accept: "application/json", "X-APIKEY": apiKeyHolodex },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        const durationSeconds = data.duration;
        setMax(durationSeconds);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const checkBoss = (e) => {
    setAutoplay(true);
    let index = sliderData.findIndex((mark) => mark.value === e.target.value);
    ref.current.seekTo(e.target.value - 2);
    if (killers[index].includes("Boss")) {
      setBoss(true);
      setNPC(false);
    } else if (killers[index].includes("NPC")) {
      setNPC(true);
      setBoss(false);
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
    } catch (err) {}
  }

  function valuetext(value) {
    return sliderData.map((mark) => mark.label);
  }
}
