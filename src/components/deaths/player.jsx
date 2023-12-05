import { useEffect } from "react"

const sheetID = import.meta.env.VITE_SHEET_ID
export default function Player() {
    const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&sheet=Ame14`
    
    const handleClick = () => {
        fetch(url)
        .then((response) => response.text())
        .then((csvText) => console.log(csvText))
        .catch((err) => {
          console.log(err.message);
        });
    }
    function handleResponse(csvText) {
        csvToObjects(csvText);
      }
      function csvToObjects(csv) {
        const csvRows = csv.split("\n");
    
        let objects = [];
        let timestamp = [];
        let killah = [];
        
    
        for (let i = 0, max = csvRows.length; i < max; i++) {
          let tempo = {};
          let row = csvSplit(csvRows[i]);
          let hms = row[0];
          let a = hms.split(":");
          const totalSeconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
          tempo.value = Number(totalSeconds);
          objects.push(tempo);
          for (let j = 0, max = row.length; j < max; j++) {
            if (j === 0) {
              timestamp.push(row[j]);
            } else {
              killah.push(row[j]);
            }
          }
        }
        console.log(killah)
  
   
    
    
      }
      
  function csvSplit(row) {
    return row.split(",").map((val) => val.substring(1, val.length - 1));
  }


  return <button style={{width: "100px", height: "40px"}} onClick={handleClick}>GG</button>
}
