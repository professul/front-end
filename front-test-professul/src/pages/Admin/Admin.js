import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import {
  getReports,
  setSelectedReports,
  suspendUser,
  banUser,
} from "../../redux/slices/reportsSlice";
import style from "./Admin.module.css";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { reports, selectedReports, loading, error } = useSelector(
    (state) => state.reports
  );
  const handleSuspend = (userId) => {
    dispatch(suspendUser(userId));
  };

  const handleBan = (userId) => {
    dispatch(banUser(userId));
  };

  // const [selectedReports, setSelectedReports] = useState([]);
  const [rowClick, setRowClick] = useState(true); // 행 클릭 여부를 관리할 상태
  const handleRowClick = (e) => {
    setRowClick(!rowClick);
  };

  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]);

  // 액션을 수행하는 함수
  const handleAction = (report) => {
    console.log("Taking action for report:", report);
  };

  const ActionButtons = ({ rowData }) => {
    const dispatch = useDispatch();

    const handleSuspend = () => {
      dispatch(suspendUser(rowData.id));
    };

    const handleBan = () => {
      dispatch(banUser(rowData.id));
    };

    const handleAction = () => {
      console.log("Taking action for report:", rowData);
    };

    return (
      <>
        {/* <Button
          onClick={handleSuspend}
          icon="pi pi-user-minus"
          className="p-button-warning"
          tooltip="Suspend User"
        />
        <Button
          onClick={handleBan}
          icon="pi pi-times"
          className="p-button-danger"
          tooltip="Ban User"
          style={{ marginLeft: "10px" }}
        /> */}
        <Button
          onClick={handleAction}
          icon="pi pi-ban"
          className="p-button-danger"
          tooltip="Take Action"
        />
      </>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return <ActionButtons rowData={rowData} />;
  };
  const tempReports = [
    {
      id: 1,
      reviewId: "123",
      reporter: "John Doe",
      reportedUser: "Jane Smith",
      reason: "Inappropriate content",
      date: "2023-05-01",
    },
    {
      id: 2,
      reviewId: "456",
      reporter: "Bob Johnson",
      reportedUser: "Alice Williams",
      reason: "Spam",
      date: "2023-05-02",
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={style["card"]}>
      <div className="flex justify-content-center align-items-center mb-4 gap-2"></div>
      <DataTable
        // value={reports}
        value={tempReports}
        selectionMode="checkbox"
        selection={selectedReports}
        onSelectionChange={(e) => dispatch(setSelectedReports(e.value))}
        dataKey="id"
        tableStyle={{ minWidth: "50rem" }}
        onRowClick={handleRowClick}
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
