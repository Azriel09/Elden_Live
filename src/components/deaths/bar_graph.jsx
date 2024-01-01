import { useEffect, useState } from "react";
import { useTalentState } from "../../context/talent-context";
import ReactApexChart from "react-apexcharts";
export default function BarGraphKillers({ killers, selectedStreamLink }) {
  const [killer, setKiller] = useState([]);
  const [deaths, setDeaths] = useState([]);

  const { selectedTalent } = useTalentState();
  useEffect(() => {
    let tempObj = {};
    killers.map((killer) => {
      if (tempObj[killer]) {
        tempObj[killer]++;
      } else {
        tempObj[killer] = 1;
      }
    });
    countOccurences(tempObj);
  }, [selectedStreamLink]);
  function chartColor() {
    switch (selectedTalent) {
      case "Amelia Watson":
        return "#ffff00";
      case "Mori Calliope":
        return "#ff0000";
      case "Gawr Gura":
        return "#008ffb";
      case "Ninomae Ina'nis":
        return "#9400d3";
      case "IRyS":
        return "#ff00ff";
      case "Ouro Kronii":
        return "#0000ff";
    }
  }

  function countOccurences(arr) {
    // Sort from highest to lowest
    const sortKillers = Object.fromEntries(
      Object.entries(arr).sort(([, a], [, b]) => b - a)
    );
    let tempoUnique = [];
    let tempoSeries = [];
    for (const [key, value] of Object.entries(sortKillers)) {
      const tempoKey = key;
      console.log(tempoKey);
      if (tempoKey.includes("Boss")) {
        let tempoBoss = tempoKey.replace("Boss", "");
        tempoUnique.push(tempoBoss);
      } else if (tempoKey.includes("NPC")) {
        let tempoNPC = tempoKey.replace("NPC", "");
        tempoUnique.push(tempoNPC);
      } else {
        tempoUnique.push(tempoKey);
      }
      tempoSeries.push(value);
    }
    setKiller(tempoUnique);
    setDeaths(tempoSeries);
  }

  function chartValueFontColor() {
    const black = "Amelia Watson";
    if (black === selectedTalent) {
      return "black";
    } else {
      return "white";
    }
  }
  const barSeries = [
    {
      data: deaths,
    },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 500,
      width: 1000,

      fontFamily: "Elden Ring",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        height: "100%",
        dataLabels: {
          position: "bottom",
        },
      },
    },
    labels: killer,

    yaxis: {
      categories: killer,
    },
  };
  return (
    <div>
      {killer ? (
        <ReactApexChart options={options} series={barSeries} type="bar" />
      ) : null}
    </div>
  );
}
