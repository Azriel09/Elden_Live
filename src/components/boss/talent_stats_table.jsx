import { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";

import { MultiSelect } from "primereact/multiselect";
import { Slider } from "primereact/slider";
import { Tag } from "primereact/tag";
import { TriStateCheckbox } from "primereact/tristatecheckbox";

import "./table_styles.scss";
export default function TalentStats({ talentStats }) {
  if (!talentStats) {
    return null;
  }
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
  return (
    <div className="table-container">
      <div className="card">
        <DataTable
          size="small"
          scrollable
          stripedRows
          scrollHeight="200px"
          value={talentStats}
          sortOrder={1}
          style={{ minHeight: "40vh" }}
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
                  style={{ minWidth: "200px" }}
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
