import GetData from "../../query/fetch_data";
import Loading from "../loading/loading";
import BossBarChart from "./boss_bar_graph";
import BossSelection from "./boss_selection";
import "./boss_styles.scss";
import { useEffect, useState } from "react";

export default function BossContainer() {
  const [selectedBoss, setSelectedBoss] = useState("Tree Sentinel Boss");
  const data = GetData();
  if (data === "loading") {
    return <Loading />;
  }
  const tempo = Object.values(data.bossStats).filter(
    (boss) => boss.boss === selectedBoss
  );
  const filteredStats = Object.values(tempo).map((stat) => {
    return Object.keys(stat.talent_stats).map((talent) => {
      return { Talent: talent, ...stat.talent_stats[talent] };
    });
  });

  // const tempo1 = Object.entries(data.bossStats).map((talent) => {
  //   console.log(talent[1].boss);
  // });

  return (
    <div className="boss-container">
      <BossSelection setSelectedBoss={setSelectedBoss} />
      <BossBarChart
        selectedBoss={selectedBoss}
        data={data.deaths}
        stats={filteredStats}
      />
    </div>
  );
}
