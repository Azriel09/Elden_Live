import { useEffect, useState } from "react";
import { useTalentState } from "../../context/talent-context";
import ReactApexChart from "react-apexcharts";
import "./bar_graph_styles.scss";
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
  }, [selectedStreamLink, killers]);

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

    // Separate Killer and number of deaths from those killer
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
      height: 700,
      width: 1000,
      foreColor: "#b9b9bb",
      fontSize: "50px",
      fontFamily: "Elden Ring",
    },
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: [`#FFF`],
        textAlign: "center",
        fontSize: "1.5em",
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
      },
      offsetX: 0,
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
    xaxis: {
      categories: killer,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  };
  return (
    <div className="bar-graph-wrapper">
      {killer ? (
        <ReactApexChart
          options={options}
          series={barSeries}
          type="bar"
          height="125%"
          style={{ marginTop: "-25px" }}
        />
      ) : null}
    </div>
  );
}
