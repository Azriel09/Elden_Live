import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import {
  GuraIcon,
  AmeIcon,
  CalliIcon,
  KroniiIcon,
  InaIcon,
  IrysIcon,
} from "../sidenav/icons";
import "./table_styles.scss";
export default function TalentStats({ talentStats }) {
  if (!talentStats) {
    return null;
  }

  // Column headers to map over
  const fieldList = [
    "Talent",
    "Deaths",
    "Level",
    "Vigor",
    "Mind",
    "Endurance",
    "Strength",
    "Dexterity",
    "Intelligence",
    "Faith",
    "Arcane",
  ];

  // Deaths column data font color
  const deathTemplate = (rowData) => {
    return (
      <div style={{ color: "#55b0c6", fontWeight: "bold" }}>
        {rowData.Deaths}
      </div>
    );
  };

  const nameIconTemplate = (rowData) => {
    const Template = ({ children }) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "5px",
          }}
        >
          {children}
        </div>
      );
    };

    switch (rowData.Talent) {
      case "Ninomae Ina'nis":
        return (
          <Template>
            {<InaIcon />}
            {rowData.Talent}
          </Template>
        );
      case "Gawr Gura":
        return (
          <Template>
            {<GuraIcon />}
            {rowData.Talent}
          </Template>
        );
      case "Mori Calliope":
        return (
          <Template>
            {<CalliIcon />}
            {rowData.Talent}
          </Template>
        );
      case "Ouro Kronii":
        return (
          <Template>
            {<KroniiIcon />}
            {rowData.Talent}
          </Template>
        );
      case "IRyS":
        return (
          <Template>
            {<IrysIcon />}
            {rowData.Talent}
          </Template>
        );
      case "Amelia Watson":
        return (
          <Template>
            {<AmeIcon />}
            {rowData.Talent}
          </Template>
        );
    }
  };

  return (
    <div className="table-container">
      <div className="card">
        <DataTable
          size="small"
          scrollable
          stripedRows
          scrollHeight="35vh"
          value={talentStats}
          sortField="Deaths"
          sortOrder={-1}
          className="data-table"
        >
          {fieldList.map((field, index) => {
            if (index === 0) {
              return (
                <Column
                  frozen
                  key={index}
                  field={field}
                  header={field}
                  sortable
                  align="center"
                  body={nameIconTemplate}
                  style={{ minWidth: "200px" }}
                ></Column>
              );
            } else if (field === "Deaths") {
              return (
                <Column
                  body={deathTemplate}
                  key={index}
                  field={field}
                  header={field}
                  sortable
                  align="center"
                ></Column>
              );
            } else {
              return (
                <Column
                  key={index}
                  field={field}
                  header={field}
                  sortable
                  align="center"
                  style={{ minWidth: "100px" }}
                ></Column>
              );
            }
          })}
        </DataTable>
      </div>
    </div>
  );
}
