import { useState, useEffect } from "react";
import { Box, Slider } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

const apiKeyYT = import.meta.env.VITE_YOUTUBE_API_KEY;
const apiKeyHolodex = import.meta.env.VITE_HOLODEX_API_KEY;
export default function Timestamps({ selectedStreamLink }) {


  const [max, setMax] = useState();
  const [sliderData, setSliderData] = useState([]);
  const [boss, setBoss] = useState(false);
  const [npc, setNPC] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const timesArr = [];
  const killerArr = [];
}
