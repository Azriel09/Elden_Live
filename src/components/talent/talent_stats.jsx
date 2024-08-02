import { useEffect, useState } from "react";

export default function TalentStats({
  selectedData,
  selectedTalent,
  handleSelectingTalent,
}) {
  const [totalStreams, setTotalStreams] = useState();
  const [totalDeaths, setTotalDeaths] = useState();
  const [avgDeaths, setAvgDeaths] = useState();
  const [deathList, setDeathList] = useState({});
  useEffect(() => {
    console.log(selectedData);
    setTotalStreams(selectedData.length);
    let totalD = 0;

    // Counts the total deaths and average deaths per stream
    selectedData.map((stream) => {
      const deaths = Object.values(stream["timestamps_killers"]).length;
      totalD = totalD + deaths;
    });
    setTotalDeaths(totalD);
    setAvgDeaths(Math.round(totalD / selectedData.length));

    const counts = {};

    // Counts the occurances of every cause of death
    for (let key in selectedData) {
      const timestampsObj = selectedData[key]["timestamps_killers"];
      Object.values(timestampsObj).map((killer) => {
        if (counts[killer]) {
          counts[killer]++;
        } else {
          counts[killer] = 1;
        }
      });
    }
    const entries = Object.entries(counts);

    // Sort descending
    const sortedEntries = entries.sort((a, b) => b[1] - a[1]);

    // Convert the array back into obj
    const sortedObject = Object.fromEntries(sortedEntries);

    setDeathList(sortedObject);
  }, []);
  return (
    <>
      <button onClick={() => handleSelectingTalent("")}>Reset</button>
      <h1>{selectedTalent}</h1>
      <div>
        <h4>Total Streams: {selectedData.length}</h4>
        <h4>Total Deaths: {totalDeaths}</h4>
        <h4>Average Deaths/Stream: {avgDeaths}</h4>
        {Object.keys(deathList).map((death, i) => {
          return (
            <div key={i}>
              {death}: {deathList[death]}
            </div>
          );
        })}
      </div>
    </>
  );
}
