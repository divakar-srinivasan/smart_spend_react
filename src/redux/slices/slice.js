// src/actions.js
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "name",
  initialState: {
    value: "",
  },
  reducers: {
    setName: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setName } = userSlice.actions;
export default userSlice.reducer;
