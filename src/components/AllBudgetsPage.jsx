import React, { useState } from "react";
import "../css/detail.css";
import { AiFillHome } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  addExpense,
  deleteExpenses,
  setSelectedBudget,
} from "../redux/slices/budget";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllBudgetsPage = () => {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  const selectedData = useSelector((state) => state.budget.SelectedBudget);
  const expenses = selectedData ? selectedData.expenses : [];

  const budget = selectedData ? parseFloat(selectedData.amount) : 0;

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + expense.ExpenseAmount,
    0
  );
  const remaining = budget - totalSpent;
  const progressPercentage = (totalSpent / budget) * 100;

  // Function to add new expense
  const handleAddExpense = async () => {
    if (expenseName.trim() === "") {
      toast.error("Enter the expense name");
      return;
    }
    if (amount.trim() === "") {
      toast.error("Enter the expense amount");
      return;
    }

    const newExpense = {
      ExpenseName: expenseName,
      ExpenseAmount: parseFloat(amount),
      date: new Date().toLocaleDateString(),
    };

    try {
      await dispatch(
        addExpense({ budgetName: selectedData.name, expense: newExpense })
      );
      dispatch(setSelectedBudget(selectedData)); // Reset SelectedBudget to trigger re-render
      toast.success("Expense added successfully!");
      setExpenseName("");
      setAmount("");
    } catch (error) {
      toast.error("Failed to add expense");
    }
  };

  // Function to delete expense
  const handleDeleteExpense = async (index) => {
    try {
      await dispatch(
        deleteExpenses({ budgetName: selectedData.name, expenseIndex: index })
      );
      dispatch(setSelectedBudget(selectedData)); // Reset SelectedBudget to trigger re-render
      toast.success("Expense deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete expense");
    }
  };

  return (
    <div className="expenses-tracker">
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
      <div className="expenses-overview">
        <h1 className="expenses-header">{selectedData.name} Overview</h1>
        <div className="expense-card-wrapper">
          <div className="expenses-budget-card">
            <h2>{selectedData.name}</h2>
            <p>${selectedData.amount} Budgeted</p>
            <div className="expenses-progress-bar">
              <div
                className="expenses-progress"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="expenses-budget-info">
              <span>${totalSpent.toFixed(2)} spent</span>
              <span>${remaining.toFixed(2)} remaining</span>
            </div>
            <button className="expenses-delete-budget">Delete Budget</button>
          </div>
          <div className="expenses-add-expense">
            <div className="expenses-add-inners">
              <h2>Add New Expense</h2>
              <input
                type="text"
                placeholder="e.g., Coffee"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
              />
              <input
                type="number"
                placeholder="e.g., 3.50"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button onClick={handleAddExpense}>Add Expense</button>
            </div>
          </div>
        </div>
      </div>

      <div className="expenses-expenses">
        <h2>Expenses</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.ExpenseName}</td>
                <td>${expense.ExpenseAmount}</td>
                <td>{expense.date}</td>
                <td>
                  <button onClick={() => handleDeleteExpense(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBudgetsPage;
