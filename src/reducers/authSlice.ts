import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean | null;
  user: any | null;
}

const getTokenFromLocalStorage = () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("byte_user");
    if (user && user !== undefined) {
      return JSON.parse(user);
    } else {
      return {};
    }
  } catch (error) {
    return null;
  }
}

const initialState: AuthState = {
  token: getTokenFromLocalStorage(),
  isAuthenticated: null,
  user: getUserFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState["user"]>) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("byte_user", JSON.stringify(action.payload.user));
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("byte_user");
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<AuthState["user"]>) => {
      localStorage.setItem("byte_user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
