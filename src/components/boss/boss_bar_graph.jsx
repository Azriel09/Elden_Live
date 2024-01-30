import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import GetData from "../../query/fetch_data";
import Loading from "../loading/loading";
import {
  GuraIcon,
  AmeIcon,
  CalliIcon,
  InaIcon,
  IrysIcon,
  KroniiIcon,
} from "../sidenav/icons";
import "primereact/resources/primereact.css";
import TalentStats from "./talent_stats_table";
export default function BossBarChart({ selectedBoss, data, stats }) {
  const [getCategories, setGenCategories] = useState([]);
  const [overallData, setOverallData] = useState();
  const [filteredData, setFilteredData] = useState({});
  const [filteredStats, setfilteredStats] = useState({});

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

  // const barSeries = Object.entries(filteredData);

  // const options = {
  //   chart: {
  //     type: "bar",
  //     height: 400,
  //     width: 1000,
  //     foreColor: "#fff",
  //     fontSize: "50px",
  //     fontFamily: "Elden Ring",
  //   },
  // };
  const talentList = [
    AmeIcon,
    CalliIcon,
    GuraIcon,
    InaIcon,
    IrysIcon,
    KroniiIcon,
  ];
  const imgList = [
    "./src/assets/talent-icons/ame.png",
    "./src/assets/talent-icons/calli.png",
    "./src/assets/talent-icons/gura.png",
    "./src/assets/talent-icons/ina.png",
    "./src/assets/talent-icons/irys.png",
    "./src/assets/talent-icons/kronii.png",
  ];

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
