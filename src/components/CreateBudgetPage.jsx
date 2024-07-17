// Dashboard.js
import React, { useEffect, useState } from "react";
import "../css/DashBoard.css";
import { AiFillHome } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setBudget } from "../redux/slices/budget";
import { v4 as uuidv4 } from "uuid";
const CreateBudgetPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state) => state.name.value);
  const [budget, setBudgetState] = useState({
    budgetName: "",
    amount: "",
  });
  const data = useSelector((state) => state.budget.myBudget);
  console.log(data);
  console.log(userName);
  useEffect(() => {
    const notify = () => {
      toast.success(`Welcome Back ${userName}`);
    };
    if (userName) {
      notify();
    }
  }, [userName]);

  const handleChange = (e) => {
    setBudgetState({
      ...budget,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (budget.budgetName.trim() === "") {
      toast.error("Enter the budget name");
    } else if (budget.amount.trim() === "") {
      toast.error("Enter the amount");
    } else {
      const newBudget = {
        id: uuidv4(),
        name: budget.budgetName,
        amount: budget.amount,
        date: new Date().toLocaleDateString(),
      };
      dispatch(setBudget(newBudget));
      console.log("successMessage");
      setBudgetState({
        budgetName: "",
        amount: "",
      });
      navigate("/BudgetDisplay");
    }
  };
  return (
    <div className="dashboard">
      <ToastContainer />
      <header className="dashboard-header">
        <div className="dashboard-logo">
          <AiFillHome className="icon-img" />
          <span className="dashboard-logo-text">HomeBudget</span>
        </div>
        <button className="dashboard-delete-button">
          Delete User{" "}
          <span role="img" aria-label="delete">
            🗑️
          </span>
        </button>
      </header>
      <div className="dashboard-container">
        <main className="dashboard-main-content">
          <h1>
            Welcome back, <span className="dashboard-username">{userName}</span>
          </h1>
          <p>Personal budgeting is the secret to financial freedom.</p>
          <p>Create a budget to get started!</p>
          <div className="dashboard-create-budget">
            <h2>Create budget</h2>
            <form>
              <div className="dashboard-form-group">
                <label htmlFor="budget-name">Budget Name</label>
                <input
                  type="text"
                  name="budgetName"
                  value={budget.budgetName}
                  onChange={handleChange}
                  id="budget-name"
                  placeholder="e.g., Groceries"
                />
              </div>
              <div className="dashboard-form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  placeholder="e.g., $350"
                  name="amount"
                  value={budget.amount}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="dashboard-create-button"
                onClick={handleSubmit}
              >
                Create budget
                <span role="img" aria-label="dollar">
                  💵
                </span>
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateBudgetPage;
