import { useEffect, useState } from "react";

import "primereact/resources/primereact.css";
import TalentStats from "./talent_stats_table";
export default function TableWrapper({ selectedBoss, data, stats }) {
  const [overallData, setOverallData] = useState();
  const [filteredData, setFilteredData] = useState({});

  //   Formats the data into {Talent: [all cause of deaths]}
  // Compiles all the cause of deaths into a single array

  useEffect(() => {
    const allDeaths = Object.entries(data).map((deaths) => {
      const tempoObjects = {};

      const deathsArr = [];
      deaths[1].map((death) => {
        deathsArr.push(Object.values(death.timestamps_killers));
      });
      const flattenedArr = deathsArr.flat();
      tempoObjects[deaths[0]] = flattenedArr;
      return tempoObjects;
    });
    setFilteredData(allDeaths);

    // Filter the cause of deaths based on the selected boss
    const filteredDeaths = {};
    // [{},{},{}, ...]
    allDeaths.map((dataObject) => {
      // [talent1, [cause of deaths1], talent2, [cause of deaths2], ...]
      Object.entries(dataObject).map((dataArray) => {
        const arrayOfDeaths = dataArray[1].filter(
          (boss) => boss === selectedBoss
        );
        // {talent: [filtered array]}
        filteredDeaths[dataArray[0]] = arrayOfDeaths;
      });
    });
    setFilteredData(filteredDeaths);

    // Combines the death data and stats
    const temp = stats[0].map((stat, index) => {
      if (filteredDeaths[stat.Talent].length >= 1) {
        const deaths = filteredDeaths[stat.Talent].length;
        const tempObj = stat;
        tempObj["Deaths"] = deaths;

        return tempObj;
      }
    });
    setOverallData(temp);
  }, [selectedBoss]);
  const expandData = [];

  return (
    <div className="talent-boss-deaths-container">
      <TalentStats
        selectedBoss={selectedBoss}
        talentStats={overallData}
        filteredDeaths={filteredData}
      />
    </div>
  );
}
