import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import ReviewManagementTab from "./ReviewManagementTab";
import UserInfoTab from "./UserInfoTab";
import { useNavigate } from "react-router-dom";

const MypageHeader = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = (e) => {
    setActiveIndex(e.index);
    // 탭 인덱스에 따라 조건적으로 라우팅
    switch (e.index) {
      case 0:
        navigate("/mypage/reviewManagement"); // 리뷰 관리 탭
        break;
      case 1:
        navigate("/mypage/userInfo"); // 회원 정보 탭
        break;
      default:
        break;
    }
  };

  return (
    <div className="card">
      <TabView activeIndex={activeIndex} onTabChange={handleTabChange}>
        <TabPanel header="리뷰 관리">
          <ReviewManagementTab />
        </TabPanel>
        <TabPanel header="회원 정보">
          <UserInfoTab />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default MypageHeader;
