// src/components/BudgetManager.js
import React, { useState } from "react";
import "../css/Budget.css";
import { AiFillHome } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  setBudget,
  addExpense,
  setSelectedBudget,
} from "../redux/slices/budget";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Budget = () => {
  const data = useSelector((state) => state.budget.myBudget);
  console.log(data);
  const navigate = useNavigate();
  const [selectedBudget, setSelectBudget] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const handleSelect = (e) => {
    setSelectBudget(e.target.value);
  };

  const cardColors = ["red", "blue", "green", "orange", "purple", "teal"];
  const budgetData = useSelector((state) => state.budget.myBudget);

  const dispatch = useDispatch();
  const [budget, setBudgets] = useState({
    budgetName: "",
    amount: "",
  });

  const handleChange = (e) => {
    setBudgets({
      ...budget,
      [e.target.name]: e.target.value,
    });
  };

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    if (name === "expenseName") {
      setExpenseName(value);
    } else if (name === "expenseAmount") {
      setExpenseAmount(value);
    }
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
      };
      dispatch(setBudget(newBudget));
      setBudgets({
        budgetName: "",
        amount: "",
      });
    }
  };

  const handleAddExpense = () => {
    if (selectedBudget.trim() === "") {
      toast.error("Please select a budget");
    } else if (expenseName.trim() === "") {
      toast.error("Enter the expense name");
    } else if (expenseAmount.trim() === "") {
      toast.error("Enter the expense amount");
    } else {
      const newExpense = {
        ExpenseName: expenseName,
        ExpenseAmount: parseFloat(expenseAmount),
        date: new Date().toLocaleDateString(),
      };
      dispatch(addExpense({ budgetName: selectedBudget, expense: newExpense }));
      setExpenseName("");
      setExpenseAmount("");
      toast.success("Expense added successfully!");
    }
  };

  const handleDetails = (budgetItem) => {
    dispatch(setSelectedBudget(budgetItem));
    navigate("/detail");
  };
  return (
    <div className="Budget">
      <ToastContainer />
      <header className="Budget-header">
        <div className="Budget-header-wrapper">
          <AiFillHome className="icons" />
          <h1 style={{ marginTop: "10px" }}>HomeBudget</h1>
        </div>
        <button className="delete-user">Delete User</button>
      </header>
      <main>
        <h2 className="Budget_name">Welcome back, gowri</h2>
        <div className="form-container">
          <div className="create-budget-wrapper">
            <div className="create-budget">
              <h3>Create budget</h3>
              <div className="budget-label-container">
                <label className="budget-label">Budget Name</label>
                <input
                  type="text"
                  name="budgetName"
                  value={budget.budgetName}
                  placeholder="e.g., Groceries"
                  onChange={handleChange}
                />
              </div>
              <div className="budget-label-container">
                <label className="budget-label">Amount</label>
                <input
                  type="text"
                  name="amount"
                  value={budget.amount}
                  onChange={handleChange}
                  placeholder="e.g., $350"
                />
              </div>
              <button className="create-button" onClick={handleSubmit}>
                Create budget
              </button>
            </div>
          </div>
          <div className="add-expense-wrapper">
            <div className="add-expense">
              <h3>Add New Expense</h3>
              <label>Budget Name</label>
              <select
                className="select-budget"
                value={selectedBudget}
                onChange={handleSelect}
                placeholder="Please select your budget here..."
              >
                <option value="">Select Budget</option>
                {budgetData.map((budgetItem) => (
                  <option key={budgetItem.id} value={budgetItem.name}>
                    {budgetItem.name}
                  </option>
                ))}
              </select>
              <div className="expense-wrapper">
                <div className="budget-label-container">
                  <label className="budget-label">Expense Name</label>
                  <input
                    type="text"
                    name="expenseName"
                    value={expenseName}
                    onChange={handleExpenseChange}
                    placeholder="e.g., Coffee"
                  />
                </div>
                <div className="budget-label-container">
                  <label className="budget-label">Amount</label>
                  <input
                    type="text"
                    name="expenseAmount"
                    value={expenseAmount}
                    onChange={handleExpenseChange}
                    placeholder="e.g., 3.50"
                  />
                </div>
              </div>
              <button className="add-button" onClick={handleAddExpense}>
                Add Expense
              </button>
            </div>
          </div>
        </div>
        <h2>Existing Budgets</h2>
        <div className="budgets">
          {budgetData.map((budgetItem, index) => {
            const totalAmount = parseFloat(budgetItem.amount);
            const spentAmount =
              budgetItem.expenses?.reduce(
                (sum, expense) => sum + expense.ExpenseAmount,
                0
              ) || 0;
            const remainingAmount = totalAmount - spentAmount;
            const progressPercentage = Math.min(
              (spentAmount / totalAmount) * 100,
              100
            );
            const cardColor = cardColors[index % cardColors.length];

            return (
              <div
                className="budget-card"
                key={budgetItem.id}
                style={{ borderColor: cardColor }}
              >
                <p className="budget-title">{budgetItem.name}</p>
                <p className="budget-amount">
                  ${totalAmount.toFixed(2)} Budgeted
                </p>
                <div
                  className="budget-progress"
                  style={{ width: "100%", backgroundColor: "#e0e0e0" }}
                >
                  <div
                    className="budget-progress-bar"
                    style={{
                      width: `${progressPercentage}%`,
                      backgroundColor: cardColor,
                      height: "100%",
                    }}
                  ></div>
                </div>
                <div className="budget-details">
                  <span>${spentAmount.toFixed(2)} spent</span>
                  <span>${remainingAmount.toFixed(2)} remaining</span>
                </div>
                <button
                  onClick={() => handleDetails(budgetItem)}
                  className="details-button"
                  style={{ backgroundColor: cardColor }}
                >
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Budget;
