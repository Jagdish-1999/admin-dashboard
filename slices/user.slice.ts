import { formHeaders } from "@/lib/form.header";
import { RegisterUserPayload, UserType } from "@/types/user.slice.types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (payload: RegisterUserPayload) => {
    const response = await axios.post("/api/v1/user/register", payload, {
      headers: formHeaders,
    });
    console.log("[Response]: ", response);
  }
);

const initialState: UserType = {
  isLogin: false,
  isLoading: false,
  name: "",
  email: "",
  avatar: "",
};

const userSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {},
});

export default userSlice.reducer;
