import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
// import RootLayout from "./Root";
import Home from "./pages/Home/Home";
import ProfList from "./pages/List/ProfList";
import ReviewContent from "./pages/Review/ReviewContent";
import Rate from "./pages/Review/Rate";
import Compare from "./pages/Compare/Compare";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/professor" element={<ProfList />} />
        <Route exact path="/professor/review" element={<ReviewContent />} />
        <Route exact path="/rating" element={<Rate />} />
        <Route exact path="/professor/compare" element={<Compare />} />
      </Routes>
    </div>
  );
}

export default App;
