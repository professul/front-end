import React, { useEffect, useState } from "react";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import {
  getReports,
  setSelectedReports,
} from "../../redux/slices/reportsSlice";
const AdminPage = () => {
  const dispatch = useDispatch();
  const { reports, selectedReports, loading, error } = useSelector(
    (state) => state.reports
  );
  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]); // const [reports] = useState([

  // const [selectedReports, setSelectedReports] = useState(null); // 선택된 신고들을 관리할 상태
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="card">
      <div className="flex justify-content-center align-items-center mb-4 gap-2"></div>
      <DataTable
        value={reports}
        selectionMode="checkbox"
        selection={selectedReports}
        onSelectionChange={(e) => dispatch(setSelectedReports(e.value))}
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
