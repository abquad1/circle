import {PayloadAction, createSlice } from "@reduxjs/toolkit";
interface User {
    // id: string;
    email: string;
    fullName: string;
    password: string
    // name: string;
  }
  
  interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    showLogin: boolean;
    showRegister: boolean;
    loading: boolean;
    error: string | null;
  }

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    showLogin: false,
    showRegister: false,
    loading: false,
    error: null
  } as AuthState,
  reducers: {
    loginStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      
    login: (state, action:  PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    toggleLogin: (state) => {
      state.showLogin = !state.showLogin;
    },
    toggleRegister: (state) => {
      state.showRegister = !state.showRegister;
    },
    showLoginOnly: (state) => {
      state.showLogin = true;
      state.showRegister = false;
    },
    showRegisterOnly: (state) => {
      state.showLogin = false;
      state.showRegister = true;
    },
    hideAuthModals: (state) => {
      state.showLogin = false;
      state.showRegister = false;
    }
  }
});

export const {
  login,
  logout,
  toggleLogin,
  toggleRegister,
  showLoginOnly,
  showRegisterOnly,
  hideAuthModals
} = authSlice.actions;

export default authSlice.reducer;