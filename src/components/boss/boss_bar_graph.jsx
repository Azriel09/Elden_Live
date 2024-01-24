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
export default function BossBarChart({ selectedBoss, data, stats }) {
  const [getCategories, setGenCategories] = useState([]);
  const [allData, setAllData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [filteredStats, setfilteredStats] = useState({});
  //   Formats the data into {Talent: [all cause of deaths]}

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
    setAllData(allDeaths);

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
    const filteredTalentStats = stats.filter(
      (stat) => stat.boss === selectedBoss
    );
    setfilteredStats(filteredTalentStats);
  }, [selectedBoss]);

  const barSeries = Object.entries(filteredData);

  const options = {
    chart: {
      type: "bar",
      height: 400,
      width: 1000,
      foreColor: "#fff",
      fontSize: "50px",
      fontFamily: "Elden Ring",
    },
  };
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
      {Object.entries(filteredData).map((data, index) => {
        if (data[1].length === 0) {
          return;
        }
        return (
          <div className="talent-boss-data" key={index}>
            {/* <div className={`talent-picture ${talentList[index]}`}></div> */}
            <div className="talent-boss-wrapper">
              {" "}
              <img src={imgList[index]} className="talent-image" />
              <div className="talent-name">{data[0]}</div>
              <div className="talent-deaths">DEATHS: {data[1].length}</div>
            </div>

            <div className="death-description">
              <div className="talent-stats">{Object.entries(filteredStats[0].talent_stats).map((stat) => {
                if (stat[0] === data[0]) {
                  return Object.entries(stat[1]).map((data, i) => {
                    return (
                      <div className="talent-specific-stat" key={i}>
                        {data[0]}: {data[1]}
                      </div>
                    );
                  });
                }
              })}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
