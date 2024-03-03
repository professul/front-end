import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
// import RootLayout from "./Root";
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
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<LoginForm />} />

        <Route path="/mypage/*" element={<MypageHeader />} />

        <Route exact path="/admin" element={<AdminPage />} />
        <Route exact path="/professor" element={<ProfList />} />
        <Route exact path="/professor/review" element={<ReviewContent />} />
        <Route exact path="/rating" element={<Rate />} />
        <Route exact path="/professor/compare" element={<Compare />} />
      </Routes>
    </div>
  );
}

export default App;
