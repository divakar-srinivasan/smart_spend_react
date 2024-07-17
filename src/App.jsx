import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginUser from "../src/components/Login";
import CreateBudgetPage from "../src/components/CreateBudgetPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginUser />} />
        <Route exact path="/CreateBudgetPage" element={<CreateBudgetPage />} />
      </Routes>
    </Router>
  );
}

export default App;
