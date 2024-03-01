import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RootLayout from "./Root";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
