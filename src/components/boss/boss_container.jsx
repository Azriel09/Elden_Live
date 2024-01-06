import BossBarChart from "./boss_bar_graph";
import BossSelection from "./boss_selection";
import "./boss_styles.scss";
import { useEffect, useState } from "react";
export default function BossContainer() {
  const [selectedBoss, setSelectedBoss] = useState("Tree Sentinel");
  useEffect(() => {}, [selectedBoss]);
  return (
    <div className="boss-container">
      <BossSelection setSelectedBoss={setSelectedBoss} />
      <BossBarChart selectedBoss={selectedBoss} />
    </div>
  );
}
