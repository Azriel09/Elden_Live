import { useEffect, useState } from "react";
import { useTalentState } from "../../context/talent-context";
import ReactApexChart from "react-apexcharts";
import "./bar_graph_styles.scss";
import { Box } from "@mui/material";
import SheetFetcher from "./sheet_fetcher";
export default function BarGraphKillers({ killers, selectedStreamLink }) {
  const [killer, setKiller] = useState([]);
  const [deaths, setDeaths] = useState([]);

  const { selectedTalent } = useTalentState();

  useEffect(() => {
    // Counts the number of deaths per killer
    let tempObj = {};
    killers.map((killer) => {
      if (tempObj[killer]) {
        tempObj[killer]++;
      } else {
        tempObj[killer] = 1;
      }
    });
    countOccurences(tempObj);
  }, [killers]);

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
      return "black";
    }
  }

  function chartLabelFontShadow() {
    switch (selectedTalent) {
      case "Amelia Watson":
        return "0 0 5px #ffefcc, 0 0 5px #ffff00";
      case "Gawr Gura":
        return "0 0 5px #5abeff, 0 0 5px #add8e6";
      case "IRyS":
        return "0 0 5px #69035a, 0 0 5px #ff00ff";
      case "Ouro Kronii":
        return "0 0 5px #243a9e, 0 0 5px #0000ff";
      case "Ninomae Ina'nis":
        return "0 0 5px #54396d, 0 0 5px #9400d3";
      case "Mori Calliope":
        return "0 0 5px #bf547b, 0 0 5px #ff0000";
    }
  }
  const barSeries = [{ name: "Deaths", data: deaths }];
  const options = {
    chart: {
      type: "bar",
      height: 700,
      width: 1000,
      foreColor: "#fff",
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
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 0.3,
        opacityTo: 1,
        stops: [0, 75, 100],
        colorStops: [],
      },
    },
    colors: "#49526B",
  };


  
  return (
    <div className="bar-graph-wrapper">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          ".apexcharts-tooltip": {
            color: "black",
            fontSize: "30px",
          },
          ".apexcharts-datalabel": {
            marginTop: "100px",
            textShadow: `${chartLabelFontShadow()}`,
          },
          // ".apexcharts-data-labels": {
          //   marginTop: "100px",
          // },
          "#SvgjsG1551": {
            marginTop: "10px",
          },
        }}
      >
        <ReactApexChart
          options={options}
          series={barSeries}
          type="bar"
          height="150%"
          style={{ marginTop: "-25px" }}
        />
        <SheetFetcher />
      </Box>
    </div>
  );
}
