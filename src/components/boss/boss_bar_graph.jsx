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
export default function BossBarChart({ selectedBoss, data }) {
  const [getCategories, setGenCategories] = useState([]);
  const [allData, setAllData] = useState({});
  const [filteredData, setFilteredData] = useState({});
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
  }, [selectedBoss]);

  const barSeries = Object.entries(filteredData);
  console.log(filteredData);
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
  const talentList = ["ame", "calli", "gura", "ina", "irys", "kronii"];
  return (
    <div className="talent-boss-deaths-container">
      {Object.entries(filteredData).map((data, index) => {
        console.log(data[0]);
        if (data[1].length === 0) {
          return;
        }
        return (
          <div className="talent-boss-data">
            
            <div className={`talent-picture ${talentList[index]}`}></div>
          </div>
        );
      })}
    </div>
  );
}
