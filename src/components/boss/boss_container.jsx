import GetData from "../../query/fetch_data";
import Loading from "../loading/loading";
import BossSelection from "./boss_selection";
import "./boss_styles.scss";
import { useState } from "react";
import TableWrapper from "./table_wrapper";

export default function BossContainer() {
  const [selectedBoss, setSelectedBoss] = useState("Tree Sentinel Boss");
  const data = GetData();
  if (data === "loading") {
    return <Loading />;
  }

  // Filter to only show stats according to selected boss
  const tempo = Object.values(data.bossStats).filter(
    (boss) => boss.boss === selectedBoss
  );

  const filteredStats = Object.values(tempo).map((stat) => {
    return Object.keys(stat.talent_stats).map((talent) => {
      return { Talent: talent, ...stat.talent_stats[talent] };
    });
  });

  return (
    <div className="boss-container">
      <BossSelection setSelectedBoss={setSelectedBoss} />
      <TableWrapper
        selectedBoss={selectedBoss}
        data={data.deaths}
        stats={filteredStats}
      />
    </div>
  );
}
