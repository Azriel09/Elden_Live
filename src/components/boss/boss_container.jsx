import GetData from "../../query/fetch_data";
import Loading from "../loading/loading";
import BossBarChart from "./boss_bar_graph";
import BossSelection from "./boss_selection";
import "./boss_styles.scss";
import { useEffect, useState } from "react";
export default function BossContainer() {
  const [selectedBoss, setSelectedBoss] = useState("Tree Sentinel");
  const data = GetData();
  if (data === "loading") {
    return <Loading />;
  }
  return (
    <div className="boss-container">
      <BossSelection setSelectedBoss={setSelectedBoss} />
      <BossBarChart selectedBoss={selectedBoss} data={data.deaths} />
    </div>
  );
}
