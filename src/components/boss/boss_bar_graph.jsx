import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import GetData from "../../query/fetch_links";
import Loading from "../loading/loading";
export default function BossBarChart({ selectedBoss }) {
  const [getCategories, setGenCategories] = useState([]);
  const data = GetData();
  if (data === "loading") {
    return <Loading />;
  }

  //   Formats the data into {Talent: [all cause of deaths]}
  const allDeaths = Object.entries(data.deaths).map((deaths) => {
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

  
}
