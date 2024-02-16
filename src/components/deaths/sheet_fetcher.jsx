import { useEffect } from "react";

export default function SheetFetcher() {
  const sheetURL =
    "https://docs.google.com/spreadsheets/d/1RbmeWv7zdmLIvQoOiKZYOkHlcMfBsMxs7nj5C2nCjYg/gviz/tq?tqx=out:csv&sheet=Bijou1";

  useEffect(() => {
    fetch(sheetURL)
      .then((response) => response.text())
      .then((csvText) => handleResponse(csvText))
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  function handleResponse(csvText) {
    let sheetObjects = csvToObjects(csvText);
  }

  function csvToObjects(csv) {
    const csvRows = csv.split("\n");
    const propertyNames = csvSplit(csvRows[0]);
    let objects = [];
    let stream = [];
    let death = [];
    let link = [];
    console.log(csvRows);
    for (let i = 0, max = csvRows.length; i < max; i++) {
      let thisObject = {};
      let row = csvSplit(csvRows[i]);
      for (let j = 0, max = row.length; j < max; j++) {
        thisObject[propertyNames[j]] = row[j];
        if (j === 0) {
          stream.push(row[j]);
        } else if (j === 1) {
          death.push(row[j]);
        } else {
          link.push(row[j]);
        }
      }

      objects.push(thisObject);
    }
  }

  function csvSplit(row) {
    return row.split(",").map((val) => val.substring(1, val.length - 1));
  }
}
