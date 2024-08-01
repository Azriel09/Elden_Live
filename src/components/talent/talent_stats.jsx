export default function TalentStats({
  data,
  selectedTalent,
  setSelectedTalent,
}) {
  return (
    <>
      <button onClick={() => setSelectedTalent("")}>Reset</button>
      <h1>{selectedTalent}</h1>
    </>
  );
}
