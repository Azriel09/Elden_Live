import { useContext, createContext, useState } from "react";

export const TalentContext = createContext();
export function TalentProvider({ children }) {
  const [selectedTalent, setSelectedTalent] = useState("");

  return (
    <TalentContext.Provider value={{ selectedTalent, setSelectedTalent }}>
      {children}
    </TalentContext.Provider>
  );
}

export function useTalentState() {
  const context = useContext(TalentContext);
  if (!context) {
    throw new Error("useTalentState must be used within TalentProvider");
  }
  return context;
}
