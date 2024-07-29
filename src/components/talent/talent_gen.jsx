import TalentMainContent from "./main_talent_content";
import "./talent.css";
export default function TalentTab({ data, selectedTab, setSelectedTab }) {
  const tabList = ["All", "holoMyth", "holoPromise", "holoAdvent"];
  return (
    <div className="talent-tab-container">
      <ul>
        {tabList.map((tab, i) => {
          return (
            <li className="talent-tab" key={i}>
              {tab}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
