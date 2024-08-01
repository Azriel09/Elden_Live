import TalentMainContent from "./main_talent_content";
import { useEffect } from "react";
import "./talent.css";
import MythPNG from "../../assets/gen_icons/myth_logo.png";
import promisePNG from "../../assets/gen_icons/promise.png";
import adventPNG from "../../assets/gen_icons/advent.png";
export default function TalentTab({ data, selectedTab, handleTabChange }) {
  const tabList = ["All", "holoMyth", "holoPromise", "holoAdvent"];
  const iconList = ["", MythPNG, promisePNG, adventPNG];

  return (
    <div className="talent-tab-container">
      <ul>
        {tabList.map((tab, i) => {
          if (i === 0) {
            return (
              <li
                className={`${
                  selectedTab === tab ? "current-tab" : ""
                } talent-tab`}
                key={i}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </li>
            );
          } else {
            return (
              <div
                className={`${
                  selectedTab === tab ? "current-tab" : ""
                } talent-tab`}
                key={i}
              >
                <img src={iconList[i]} className="tab-icon" />
                <li onClick={() => handleTabChange(tab)}>{tab}</li>
              </div>
            );
          }
        })}
      </ul>
    </div>
  );
}
