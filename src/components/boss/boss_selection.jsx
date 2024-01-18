import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper";
import "./boss_selection_styles.scss";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
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
export default function BossSelection({ setSelectedBoss }) {
  const bosslist = [
    "Tree Sentinel Boss",
    "Margit - the Fell Omen Boss",
    "Godrick - the Grafted Boss",
    "Red Wolf of Radagon Boss",
    "Rennala - Queen of the Full Moon Boss",
    "Starscourge Radahn Boss",
    "Astel - Naturalborn of the Void Boss",
    "Rykard - Lord of Blasphemy Boss",
    "Godfrey - First Elden Lord (Golden Shade) Boss",
    "Morgott - the Omen King Boss",
    "Fire Giant Boss",
    "Malenia - Blade of Miquella Boss",
    "Godskin Duo Boss",
    "Mohg - Lord of Blood Boss",
    "Maliketh - The Black Blade Boss",
    "Sir Gideon Ofnir - The All Knowing Boss",
    "Godfrey - First Elden Lord Boss",
    "Radagon of the Golden Order Boss",
    "Elden Beast Boss",
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

  function BossImageOnScreen() {
    const width = window.innerWidth;

    if (4000 >= width && width >= 1600) {
      return 7;
    } else if (1599 >= width && width >= 1400) {
      return 6;
    } else if (1399 >= width && width >= 1200) {
      return 5;
    } else if (1199 >= width && width >= 900) {
      return 4;
    } else if (899 >= width && width >= 750) {
      return 3.5;
    } else if (749 >= width) {
      return 2;
    }
  }
  return (
    <Box
      sx={{
        width: "90vw",
        height: "50%",
      }}
      className="boss-selection-box"
    >
      <Swiper
        style={{
          "--swiper-navigation-color": "white",
          "--swiper-pagination-color": "#FFBA08",
          "--swiper-pagination-bullet-size": "12px",

          "--swiper-pagination-bullet-inactive-color": "gray",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          width: "90%",
        }}
        onSlideChange={(e) => handleChange(e)}
        slidesPerView={BossImageOnScreen()}
        slideToClickedSlide={true}
        spaceBetween={10}
        navigation={true}
        loop={true}
        pagination={true}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className="mySwiper2"
        centeredSlides={true}
      >
        {bosslist.map((boss, index) => {
          const removedBossText = boss.replace("Boss", "");
          return (
            <SwiperSlide
              style={{
                backgroundColor: "rgba(0,0,0,0)",
                width: "11.5vw",
                height: "40vh",
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

                      color: "lightgray",
                      position: "absolute",
                      textShadow: "3px 3px #000",
                      textAlign: "left",
                    }}
                    className="boss-name-header"
                  >
                    {removedBossText}
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
