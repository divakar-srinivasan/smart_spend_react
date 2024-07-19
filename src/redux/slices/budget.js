import { createSlice } from "@reduxjs/toolkit";

export const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    myBudget: [],
    SelectedBudget: null,
  },
  reducers: {
    setBudget: (state, action) => {
      state.myBudget.push({ ...action.payload, expenses: [] });
    },
    addExpense: (state, action) => {
      const { budgetName, expense } = action.payload;
      const budget = state.myBudget.find((b) => b.name === budgetName);
      if (budget) {
        budget.expenses.push(expense);
      }
    },
    setSelectedBudget: (state, action) => {
      state.SelectedBudget = action.payload;
    },
    deleteExpenses: (state, action) => {
      const { budgetName, expenseIndex } = action.payload;
      const budget = state.myBudget.find((b) => b.name === budgetName);
      if (budget) {
        budget.expenses.splice(expenseIndex, 1);
      }
    },
    deleteBudget: (state, action) => {
      const budgetName = action.payload;
      state.myBudget = state.myBudget.filter(
        (budget) => budget.name !== budgetName
      );
    },
    clearData: (state) => {
      (state.myBudget = []), (state.SelectedBudget = null);
    },
  },
});

export const {
  setBudget,
  addExpense,
  setSelectedBudget,
  deleteExpenses,
  deleteBudget,
  clearData,
} = budgetSlice.actions;
export default budgetSlice.reducer;
