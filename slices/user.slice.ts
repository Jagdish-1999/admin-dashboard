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
    //! need to handle error
    try {
      const response = await axios.post("/api/v1/user/register", payload, {
        headers: formHeaders,
      });
      if (response.status === 201) {
        toast.success(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.warning("User not created");
      throw new Error("User not created");
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (payload: LoginUserTypes, { dispatch }) => {
    const response = await axios.post("/api/v1/user/login", payload);

    if (response.status === 200) {
      dispatch(updateUserIsLogin(true));
      dispatch(updateUserLoading(false));
      toast.success(response.data.message);
      return response.data.data;
    } else {
      toast.warning(response.data.message);
      return null;
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logoutUser",
  async (_, { dispatch }) => {
    const res = await axios.get("/api/v1/user/logout");
    if (res.statusText !== "OK") {
      throw new Error("User not logged out");
    }
    dispatch(updateUser(null));
    dispatch(updateUserIsLogin(false));
    toast.success(res.data.message);
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
    updateUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    updateUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateUserIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
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

export const { updateUser, updateUserLoading, updateUserIsLogin } =
  userSlice.actions;
export default userSlice.reducer;
