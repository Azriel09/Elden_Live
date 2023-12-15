import { useState } from "react";
import { useEffect } from "react";
import { useTalentState } from "../../context/talent-context";
export default function StreamSelection({ streamLinks, setSelectedStreamIndex, setSelectedStreamLink }) {
  const { selectedTalent } = useTalentState();
  if (!streamLinks) {
    return;
  }

  function numbersToOrdinal(i) {
    const j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }
  const handleSelectedStreamChange = (value) => {
    setSelectedStreamIndex(value)
    setSelectedStreamLink(streamLinks[selectedTalent][value].links)
    console.log(streamLinks[selectedTalent][value].links)
  }
  return (
    <>
      {streamLinks ? (
        <div>
          <button onClick={() => console.log(streamLinks[selectedTalent])}>
            Streams
          </button>
          <select onChange={(e) => handleSelectedStreamChange(e.target.value)}>
            {streamLinks[selectedTalent].map((stream, i) => {
              const converted = numbersToOrdinal(i + 1);
              return (
                <option key={i} value={i}>
                  {converted}
                </option>
              );
            })}
          </select>
        </div>
      ) : null}
    </>
  );
}
