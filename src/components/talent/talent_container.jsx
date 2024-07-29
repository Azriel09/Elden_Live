import { useState } from "react";
import GetData from "../../query/fetch_data";
import Loading from "../loading/loading";
import TalentTab from "./talent_gen";
export default function TalentContainer() {
  const [selectedTab, setSelectedTab] = useState("All");

  const data = GetData();
  if (data === "loading") {
    return <Loading />;
  }

  return (
    <TalentTab
      data={data}
      setSelectedTab={setSelectedTab}
      selectedTab={selectedTab}
    />
  );
}
