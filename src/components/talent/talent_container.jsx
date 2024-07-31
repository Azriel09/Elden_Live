import { useState, useEffect } from "react";
import GetData from "../../query/fetch_data";
import Loading from "../loading/loading";
import TalentTab from "./talent_tab";
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
    <TalentTab
      data={data}
      handleTabChange={handleTabChange}
      selectedTab={selectedTab}
    />
  );
}
