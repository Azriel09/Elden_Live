import "./talent.css";
import { useEffect, useState } from "react";
import GuraPNG from "../../assets/talent_cards/gura_1.png";
export default function TalentMainContent({ data, selectedTab }) {
  const [talentList, setTalentLIst] = useState([]);
  const holoGens = {
    holoMyth: [
      "Amelia Watson",
      "Gawr Gura",
      "Ninomae Ina'nis",
      "Mori Calliope",
    ],
    holoPromise: ["IRyS", "Ouro Kronii"],
    holoAdvent: ["Koseki Biboo"],
  };
  useEffect(() => {
    switch (selectedTab) {
      case "All":
        setTalentLIst(
          Object.keys(data.deaths).map((talent) => {
            return talent;
          })
        );
        return;
      case "holoMyth":
        setTalentLIst(holoGens["holoMyth"]);
        return;
      case "holoPromise":
        setTalentLIst(holoGens["holoPromise"]);
        return;
      case "holoAdvent":
        setTalentLIst(holoGens["holoAdvent"]);
        return;
    }
  }, [selectedTab]);

  return (
    <div className="talent-main-content">
      {talentList.map((talent, i) => {
        return (
          <div className="talent-card" key={i}>
            <img src={GuraPNG} className="talent-img"></img>
            <div className="talent-name">{talent}</div>
          </div>
        );
      })}
    </div>
  );
}
