import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import ReviewManagementTab from "./ReviewManagementTab";
import UserInfoTab from "./UserInfoTab";
import { useNavigate } from "react-router-dom";

const MypageHeader = () => {
  const navigate = useNavigate();

  const handleUserInfoClick = () => {
    navigate("/mypage/userInfo");
  };

  return (
    <div className="card">
      <TabView>
        <TabPanel header="리뷰 관리">
          <ReviewManagementTab />
        </TabPanel>
        <TabPanel header="회원 정보" onClick={handleUserInfoClick}>
          <UserInfoTab />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default MypageHeader;
