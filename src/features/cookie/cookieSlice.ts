import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CookieState {
  name: null | string;
}
const initialState: CookieState = { name: null };

const cookieSlice = createSlice({
  name: "cookier",
  initialState,
  reducers: {
    setCookie(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    clearCookie(state) {
      state.name = null;
    },
  },
});

export const { setCookie, clearCookie } = cookieSlice.actions;
export default cookieSlice.reducer;
