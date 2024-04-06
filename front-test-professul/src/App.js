import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./LayOut";

import Home from "./pages/Home/Home";
import ProfList from "./pages/List/ProfList";
import ReviewContent from "./pages/Review/ReviewContent";
import Rate from "./pages/Review/Rate";
import Compare from "./pages/Compare/Compare";
import SignUp from "./pages/SignUp/Signup";
import LoginForm from "./pages/Login/Login";
import MypageHeader from "./pages/MyPages/MypageHeader";
import ReviewManagementTab from "./pages/MyPages/ReviewManagementTab";
import UserInfoTab from "./pages/MyPages/UserInfoTab";
import AdminPage from "./pages/Admin/Admin";
import PasswordCheckPage from "./pages/MyPages/PasswordCheckPage";
import EditUserInfoPage from "./pages/MyPages/EditUserInfoPage";
import ConfirmUserInfoPage from "./pages/MyPages/ConfirmUserInfoPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="join" element={<SignUp />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="user/*" element={<MypageHeader />}>
            <Route path="reviewManagement" element={<ReviewManagementTab />} />
            <Route path="userInfo" element={<UserInfoTab />} />
          </Route>
          <Route path="/password-check" element={<PasswordCheckPage />} />
          <Route path="/edit-user-info" element={<EditUserInfoPage />} />
          <Route path="/confirm-user-info" element={<ConfirmUserInfoPage />} />
          <Route path="admin/*" element={<AdminPage />} />
          <Route path="review/list" element={<ProfList />} />
          <Route path="professor/review" element={<ReviewContent />} />
          <Route path="rating" element={<Rate />} />
          <Route path="professor/compare" element={<Compare />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
