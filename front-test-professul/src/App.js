import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
// import RootLayout from "./Root";
import Home from "./pages/Home/Home";
import ProfList from "./pages/List/ProfList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/list" element={<ProfList />} />
      </Routes>
    </div>
  );
}

export default App;
