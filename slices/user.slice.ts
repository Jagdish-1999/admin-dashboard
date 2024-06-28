import { formHeaders } from "@/lib/form.header";
import {
  LoginUserTypes,
  RegisterUserPayload,
  User,
  UserType,
} from "@/types/user.slice.types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

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
      toast.success(response.data.message);
      return response.data.data;
    } else {
      return null;
    }
  }
);

export const logoutUser = createAsyncThunk("logoutUser", async () => {
  const res = await axios.get("/api/v1/user/logout");
  if (res.statusText !== "OK") {
    throw new Error("User not logged out");
  }
  toast.success(res.data.message);
});

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
      state.isLogin = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.isLogin = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.isLogin = false;
      state.user = null;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addMatcher(
      (action) =>
        action.type === registerUser.fulfilled.type ||
        action.type === registerUser.rejected.type,
      (state) => {
        state.isLoading = false;
      }
    );
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
