import GetData from "../../query/fetch_data";
import Loading from "../loading/loading";

export default function TalentContainer() {
  const data = GetData();
  if (data === "loading") {
    return <Loading />;
  }
  console.log(data);
}
