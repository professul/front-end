import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const MyComponent = () => {
    return (
        <div>
            <h1>My Data Table</h1>
            <DataTable>
                <Column field="name" header="Name"></Column>
                <Column field="age" header="Age"></Column>
            </DataTable>
        </div>
    );
}

export default MyComponent;