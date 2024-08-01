import { useState, useEffect } from "react";
import GetData from "../../query/fetch_data";
import Loading from "../loading/loading";
import TalentTab from "./talent_tab";
import TalentMainContent from "./main_talent_content";
import "./talent.css";
export default function TalentContainer() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedTalent, setSelectedTalent] = useState("");
  const [selectedData, setSelectedData] = useState();
  const data = GetData();
  if (data === "loading") {
    return <Loading />;
  }

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSelectedTalent("");
  };
  const handleSelectingTalent = (talent) => {
    setSelectedTalent(talent);
    setSelectedData(data.deaths[talent]);
  };
  return (
    <div className="talent-container">
      <TalentTab
        data={data}
        handleTabChange={handleTabChange}
        selectedTab={selectedTab}
      />
      <TalentMainContent
        selectedData={selectedData}
        selectedTab={selectedTab}
        data={data}
        selectedTalent={selectedTalent}
        handleSelectingTalent={handleSelectingTalent}
      />
    </div>
  );
}
