import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";

const AdminPage = () => {
  const [reports] = useState([
    {
      id: 1,
      reporter: "User1",
      reportedUser: "User2",
      reason: "Spam",
      date: "2024-03-01",
      reviewId: "R1001",
    },
    {
      id: 2,
      reporter: "User3",
      reportedUser: "User4",
      reason: "Inappropriate content",
      date: "2024-03-02",
      reviewId: "R1002",
    },
    {
      id: 3,
      reporter: "User5",
      reportedUser: "User6",
      reason: "Harassment",
      date: "2024-03-03",
      reviewId: "R1003",
    },
  ]); // 신고 데이터를 담을 상태
  const [selectedReports, setSelectedReports] = useState(null); // 선택된 신고들을 관리할 상태
  const [rowClick, setRowClick] = useState(true); // 행 클릭 여부를 관리할 상태

  // 액션을 수행하는 함수
  const handleAction = (report) => {
    // 여기에 액션을 수행하는 코드를 추가
    console.log("Taking action for report:", report);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        onClick={() => handleAction(rowData)}
        icon="pi pi-ban"
        className="p-button-danger"
        tooltip="Take Action"
      />
    );
  };

  return (
    <div className="card">
      <div className="flex justify-content-center align-items-center mb-4 gap-2"></div>
      <DataTable
        value={reports}
        selectionMode="checkbox" // 체크박스를 사용하여 행 선택
        selection={selectedReports}
        onSelectionChange={(e) => setSelectedReports(e.value)}
        dataKey="id"
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column
          field="reviewId"
          header="Review ID"
          headerStyle={{ width: "10%" }}
        />
        <Column field="reporter" header="Reporter" />
        <Column field="reportedUser" header="Reported User" />
        <Column field="reason" header="Reason" />
        <Column field="date" header="Date" />
        <Column
          body={actionBodyTemplate}
          headerStyle={{ width: "3rem" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default AdminPage;
