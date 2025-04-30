import { createSlice } from "@reduxjs/toolkit";

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    name: "",
  },
  reducers: {
    addName: (state, action) => {
      state.name = action?.payload;
    },

    clearUserDetails: (state) => {
      state.name = "";
    },
  },
});

export const { clearUserDetails, addName } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
