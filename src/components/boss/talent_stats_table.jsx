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

  return (
    <div className="card">
      <DataTable
        value={talentStats[0]}
        sortField="name"
        sortOrder={-1}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="name" header="Talent"></Column>
        <Column
          field="Deaths"
          header="Deaths"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="Level"
          header="Level"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="Vigor"
          header="Vigor"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="Mind"
          header="Mind"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="Endurance"
          header="Endurance"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="Strength"
          header="Strength"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="Dexterity"
          header="Dexterity"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="Intelligence"
          header="Intelligence"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="Faith"
          header="Faith"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="Arcane"
          header="Arcane"
          sortable
          style={{ width: "20%" }}
        ></Column>
      </DataTable>
    </div>
  );
}
