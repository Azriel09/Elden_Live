import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import GetData from "../../query/fetch_links";
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
    const filteredDeaths = {};
    // allDeaths.map((data) => {
    //   Object.entries(data).map((key) => {
    //     filteredDeaths[key] = key[1].filter(name => name.indexOf(selectedBoss) !== -1)
    //   });
    // });
    console.log(filteredDeaths);
  }, []);
}
