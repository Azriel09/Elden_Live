import { useState } from "react";
import { useEffect } from "react";
import { useTalentState } from "../../context/talent-context";
export default function StreamSelection({ streamLinks }) {
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

  return (
    <>
      {streamLinks ? (
        <div>
          <button onClick={() => console.log(streamLinks)}>Streams</button>
          <select>
            {streamLinks[selectedTalent].map((stream, i) => {
              const converted = numbersToOrdinal(i + 1);
              return <option key={i}>{i}</option>;
            })}
          </select>
        </div>
      ) : null}
    </>
  );
}
