import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RootLayout from "./Root";
import Home from "./pages/Home/Home";
import ProfList from "./pages/List/ProfList";

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <ProfList />
    </div>
  );
}

export default App;
