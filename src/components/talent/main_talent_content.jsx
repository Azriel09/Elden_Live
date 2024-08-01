import "./talent.css";
import { useEffect, useState } from "react";
import GuraPNG from "../../assets/talent_cards/gura.png";
import CalliPNG from "../../assets/talent_cards/calli.png";
import AmePNG from "../../assets/talent_cards/ame.png";
import InaPNG from "../../assets/talent_cards/ina.png";
import KroniiPNG from "../../assets/talent_cards/kronii.png";
import BibooPNG from "../../assets/talent_cards/biboo.png";
import IRySPNG from "../../assets/talent_cards/irys.png";
import TalentStats from "./talent_stats";
export default function TalentMainContent({ data, selectedTab }) {
  const [talentList, setTalentLIst] = useState([]);
  const [imgList, setImgList] = useState([]);
  const [selectedTalent, setSelectedTalent] = useState("");
  const holoGens = {
    allPNGs: [AmePNG, CalliPNG, GuraPNG, InaPNG, IRySPNG, KroniiPNG, BibooPNG],
    holoMyth: [
      "Amelia Watson",
      "Gawr Gura",
      "Ninomae Ina'nis",
      "Mori Calliope",
    ],
    mythPNGs: [AmePNG, GuraPNG, InaPNG, CalliPNG],
    holoPromise: ["IRyS", "Ouro Kronii"],
    promisePNGs: [IRySPNG, KroniiPNG],
    holoAdvent: ["Koseki Biboo"],
    adventPNGs: [BibooPNG],
  };
  const handleSelectingTalent = (talent) => {
    console.log(talent);
    setSelectedTalent(talent);
  };

  // For images of talents
  useEffect(() => {
    switch (selectedTab) {
      case "All":
        setTalentLIst(
          Object.keys(data.deaths).map((talent) => {
            return talent;
          })
        );
        setImgList(holoGens["allPNGs"]);
        return;
      case "holoMyth":
        setTalentLIst(holoGens["holoMyth"]);
        setImgList(holoGens["mythPNGs"]);
        return;
      case "holoPromise":
        setTalentLIst(holoGens["holoPromise"]);
        setImgList(holoGens["promisePNGs"]);
        return;
      case "holoAdvent":
        setTalentLIst(holoGens["holoAdvent"]);
        setImgList(holoGens["adventPNGs"]);
        return;
    }
  }, [selectedTab]);

  if (!selectedTalent) {
    return (
      <div className="talent-main-content">
        {talentList.map((talent, i) => {
          return (
            <div
              className="talent-card"
              key={i}
              onClick={() => handleSelectingTalent(talent)}
            >
              <img src={imgList[i]} className="talent-img"></img>
              <div className="talent-name">{talent}</div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <TalentStats data={data} selectedTalent={selectedTalent} setSelectedTalent={setSelectedTalent}/>;
  }
}
