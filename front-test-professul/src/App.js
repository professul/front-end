import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import RootLayout from "./Root";
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
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="join" element={<SignUp />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="mypage/*" element={<MypageHeader />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="professor" element={<ProfList />} />
          <Route path="professor/review" element={<ReviewContent />} />
          <Route path="rating" element={<Rate />} />
          <Route path="professor/compare" element={<Compare />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
