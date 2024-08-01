import { useEffect, useState } from "react";

export default function TalentStats({
  selectedData,
  selectedTalent,
  handleSelectingTalent,
}) {
  const [totalStreams, setTotalStreams] = useState();
  const [totalDeaths, setTotalDeaths] = useState();
  const [avgDeaths, setAvgDeaths] = useState();
  useEffect(() => {
    console.log(selectedData);
    setTotalStreams(selectedData.length);
    let totalD = 0;
    selectedData.map((stream) => {
      const deaths = Object.values(stream["timestamps_killers"]).length;
      totalD = totalD + deaths;
    });
    setTotalDeaths(totalD);
    setAvgDeaths(Math.round(totalD / selectedData.length));
  }, []);
  return (
    <>
      <button onClick={() => handleSelectingTalent("")}>Reset</button>
      <h1>{selectedTalent}</h1>
      <div>
        <h4>Total Streams: {selectedData.length}</h4>
        <h4>Total Deaths: {totalDeaths}</h4>
        <h4>Average Deaths/Stream: {avgDeaths}</h4>
      </div>
    </>
  );
}
