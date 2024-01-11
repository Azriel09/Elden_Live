import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import GetData from "../../query/fetch_data";
import Loading from "../loading/loading";
export default function BossBarChart({ selectedBoss, data }) {
  const [getCategories, setGenCategories] = useState([]);
  const [allData, setAllData] = useState({});
  //   Formats the data into {Talent: [all cause of deaths]}
  useEffect(() => {
    const allDeaths = Object.entries(data).map((deaths) => {
      const tempoObjects = {};
      // tempoObjects[deaths[0]] = deaths[1].map((death) => {
      //   return Object.values(death.timestamps_killers);
      // });
      const deathsArr = [];
      deaths[1].map((death) => {
        deathsArr.push(Object.values(death.timestamps_killers));
      });
      const flattenedArr = deathsArr.flat();
      tempoObjects[deaths[0]] = flattenedArr;
      return tempoObjects;
    });
    setAllData(allDeaths);
    // const filteredDeaths = {};
    // allDeaths.map((data) => {
    //   Object.entries(data).map((key) => {
    //     filteredDeaths[key] = key[1].filter(
    //       (name) => name.indexOf(selectedBoss) !== -1
    //     );
    //   });
    // });
    const filteredDeaths = {};
    // [{},{},{}, ...]
    allDeaths.map((dataObject) => {
      // [talent1, [cause of deaths1], talent2, [cause of deaths2], ...]
      Object.entries(dataObject).map((dataArray) => {
        const arrayOfDeaths = dataArray[1].filter(
          (boss) => boss === selectedBoss
        );
        filteredDeaths[dataArray[0]] = arrayOfDeaths;
      });
    });
    console.log(filteredDeaths);
  }, [selectedBoss]);
}
