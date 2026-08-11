import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('homehiveToken');

const initialState = {
  token,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('homehiveToken');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
