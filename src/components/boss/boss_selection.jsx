import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "./boss_selection_styles.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {
  Tree,
  Margit,
  Godrick,
  Wolf,
  Rennala,
  Radahn,
  Astel,
  Rykard,
  GodfreyGolden,
  Morgott,
  FireGiant,
  Malenia,
  Godskin,
  Mohg,
  Maliketh,
  Gideon,
  Godfrey,
  Radagon,
  Beast,
} from "./boss_images";
export default function BossSelection() {
  const [selectedBoss, setSelectedBoss] = useState("Tree Sentinel");
  const bosslist = [
    "Tree Sentinel",
    "Margit",
    "Godrick",
    "Wolf of Radagon",
    "Rennala",
    "Radahn",
    "Astel",
    "Rykard",
    "Godfrey Golden Shade",
    "Morgott",
    "Fire Giant",
    "Malenia",
    "Godskin Duo",
    "Mohg",
    "Maliketh",
    "Gideon",
    "Godfrey",
    "Radagon",
    "Elden Beast",
  ];

  // Sets the current selected boss
  const handleChange = (e) => {
    const slide = e.realIndex;
    setSelectedBoss(bosslist[slide]);
  };
  const BossImage = (bossIndex) => {
    switch (bossIndex) {
      case 0:
        return Tree();
      case 1:
        return Margit();
      case 2:
        return Godrick();
      case 3:
        return Wolf();
      case 4:
        return Rennala();
      case 5:
        return Radahn();
      case 6:
        return Astel();
      case 7:
        return Rykard();
      case 8:
        return GodfreyGolden();
      case 9:
        return Morgott();
      case 10:
        return FireGiant();
      case 11:
        return Malenia();
      case 12:
        return Godskin();
      case 13:
        return Mohg();
      case 14:
        return Maliketh();
      case 15:
        return Gideon();
      case 16:
        return Godfrey();
      case 17:
        return Radagon();
      case 18:
        return Beast();
    }
  };
  return (
    <Box
      sx={{
        width: "90vw",
        height: "50%",
        backgroundColor: "#0b110c",
      }}
    >
      <Swiper
        style={{
          "--swiper-navigation-color": "white",
          width: "90%",
        }}
        onSlideChange={(e) => handleChange(e)}
        slidesPerView={"auto"}
        slideToClickedSlide={true}
        spaceBetween={10}
        navigation={true}
        loop={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        centeredSlides={true}
      >
        {bosslist.map((boss, index) => {
          return (
            <SwiperSlide
              style={{
                backgroundColor: "rgba(0,0,0,0)",
                width: "225px",
                height: "375px",
                position: "relative",
                "&Active": {
                  opacity: 1,
                },
                cursor: "pointer",
              }}
              key={index}
              className="swiper-slide"
            >
              {({ isActive }) => (
                <>
                  <Typography
                    sx={{
                      fontFamily: "Elden Ring",
                      fontSize: "1.9em",
                      color: "lightgray",
                      position: "absolute",
                      textShadow: "3px 3px #000",
                      textAlign: "left",
                    }}
                  >
                    {boss}
                  </Typography>
                  {isActive ? (
                    <img
                      src={BossImage(index)}
                      style={{
                        borderRadius: "10px",
                        opacity: "1",
                      }}
                    />
                  ) : (
                    <img
                      src={BossImage(index)}
                      style={{
                        borderRadius: "10px",
                        opacity: "0.4",
                      }}
                    />
                  )}
                </>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}
