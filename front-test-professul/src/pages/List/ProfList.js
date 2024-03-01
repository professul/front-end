import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const ProfList = () => {
  return (
    <div>
      <p>안녕</p>
      <h1>My Data Table</h1>
      <DataTable>
        <Column field="name" header="Name"></Column>

        <Column field="age" header="Age"></Column>
      </DataTable>
    </div>
  );
};

export default ProfList;
