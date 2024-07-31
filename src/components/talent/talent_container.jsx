import { useState, useEffect } from "react";
import GetData from "../../query/fetch_data";
import Loading from "../loading/loading";
import TalentTab from "./talent_tab";
import TalentMainContent from "./main_talent_content";
import './talent.css'
export default function TalentContainer() {
  const [selectedTab, setSelectedTab] = useState("All");

  const data = GetData();
  if (data === "loading") {
    return <Loading />;
  }

  const handleTabChange = (tab) => {
    console.log(tab);
    setSelectedTab(tab);
  };
  return (
    <div className="talent-container">
    <TalentTab
      data={data}
      handleTabChange={handleTabChange}
      selectedTab={selectedTab}
    />
    <TalentMainContent selectedTab={selectedTab} data={data}/>
    </div>
  );
}
