import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "light",
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload.theme;
    },
  },
});

export default themeSlice.reducer;
export const { setTheme } = themeSlice.actions;
