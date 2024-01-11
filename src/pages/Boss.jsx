import { useEffect } from "react";
import BossContainer from "../components/boss/boss_container";
import { useTalentState } from "../context/talent-context";
export default function Boss() {
  const { setSelectedTalent } = useTalentState();
  // Removes the Talent Background image
  useEffect(() => {
    setSelectedTalent("");
  });
  return <BossContainer />;
}
