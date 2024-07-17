import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginUser from "../src/components/Login";
import CreateBudgetPage from "../src/components/CreateBudgetPage";
import AllBudgetsPage from "../src/components/AllBudgetsPage";
import BudgetDisplay from "../src/components/BudgetDisplay";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginUser />} />
        <Route exact path="/CreateBudgetPage" element={<CreateBudgetPage />} />
        <Route path="/editYourBudget" element={<AllBudgetsPage />} />
        <Route path="/BudgetDisplay" element={<BudgetDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
