import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
// import RootLayout from "./Root";
import Home from "./pages/Home/Home";
import ProfList from "./pages/List/ProfList";
import ReviewContent from "./pages/Review/ReviewContent";
import SignUp from "./pages/SignUp/Signup";
import LoginForm from "./pages/Login/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/professor" element={<ProfList />} />
        <Route exact path="/professor/review" element={<ReviewContent />} />
      </Routes>
    </div>
  );
}

export default App;
