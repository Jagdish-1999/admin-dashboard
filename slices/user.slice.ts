import { formHeaders } from "@/lib/form.header";
import {
  LoginUserTypes,
  RegisterUserPayload,
  User,
  UserType,
} from "@/types/user.slice.types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (payload: RegisterUserPayload) => {
    await axios.post("/api/v1/user/register", payload, {
      headers: formHeaders,
    });
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (payload: LoginUserTypes) => {
    const response = await axios.post("/api/v1/user/login", payload);

    if (response.statusText === "OK") {
      return response.data.data;
    } else {
      return null;
    }
  }
);

const initialState: UserType = {
  isLogin: false,
  isLoading: false,
  user: null,
};

const userSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
