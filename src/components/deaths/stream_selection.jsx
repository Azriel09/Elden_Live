import { useEffect } from "react";
import { useTalentState } from "../../context/talent-context";
export default function StreamSelection({
  streamLinks,
  selectedStreamLink,
  selectedStreamIndex,
  setSelectedStreamIndex,
  setSelectedStreamLink,
}) {
  const { selectedTalent } = useTalentState();
  if (!streamLinks) {
    return;
  }

  useEffect(() => {
    // Sets the very first stream as default when changing talents selected
    setSelectedStreamLink(streamLinks[selectedTalent][0].links);
    
    setSelectedStreamIndex(0);
  }, [selectedTalent]);

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
    // setSelectedStreamIndex(value)
    setSelectedStreamLink(streamLinks[selectedTalent][value].links);
    console.log(streamLinks[selectedTalent][value].links);
    setSelectedStreamIndex(value); //Resets the select option
  };
  return (
    <>
      <div>
  
        <select
      
          value={selectedStreamIndex}
          onChange={(e) => handleSelectedStreamChange(e.target.value)}
        >
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
    </>
  );
}
