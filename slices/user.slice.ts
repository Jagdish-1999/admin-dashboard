import { formHeaders } from "@/lib/form.header";
import { fetchUserOnServer } from "@/server-calls/fetch-user";
import {
  LoginUserTypes,
  RegisterUserPayload,
  User,
  UserType,
} from "@/types/user.slice.types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

const fetchUser = createAsyncThunk("fetchUser", async () => {
  const user = await fetchUserOnServer();
  return user;
});

const registerUser = createAsyncThunk(
  "registerUser",
  async (payload: RegisterUserPayload) => {
    //! need to handle error
    try {
      const response = await axios.post("/api/v1/users/register", payload, {
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

const loginUser = createAsyncThunk(
  "loginUser",
  async (payload: LoginUserTypes, { dispatch }) => {
    const response = await axios.post("/api/v1/users/login", payload);

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

const logoutUser = createAsyncThunk("logoutUser", async (_, { dispatch }) => {
  const res = await axios.get("/api/v1/users/logout");
  if (res.statusText !== "OK") {
    throw new Error("User not logged out");
  }
  dispatch(updateUser(null));
  dispatch(updateUserIsLogin(false));
  toast.success(res.data.message);
});

const initialState: UserType = {
  isLogin: false,
  isLoading: true,
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
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoading = false;
        if (action.payload) {
          state.isLogin = true;
        }
      }
    );
    builder.addCase(fetchUser.rejected, (state) => {
      state.isLoading = false;
      state.isLogin = false;
    });
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

export { fetchUser, registerUser, loginUser, logoutUser };

export const { updateUser, updateUserLoading, updateUserIsLogin } =
  userSlice.actions;
export default userSlice.reducer;
