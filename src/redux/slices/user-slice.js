import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import instanceUserService from "../../api/user-service";

const initialState = {
  isLoggedIn: false,
  loading: true,
  error: null,
  email: null,
  token: null,
  username: null,
  image: null,
  loginStatus: null,
  registerStatus: null,
  reloading: false,
  editProfileStatus: null,
  password: null,
};

export const createUser = createAsyncThunk(
  "user/register",

  async function (data, { rejectWithValue }) {
    try {
      console.log("отработал");
      return await instanceUserService.registerAccount(data);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);
export const login = createAsyncThunk(
  "user/login",

  async function (data, { rejectWithValue }) {
    try {
      return await instanceUserService.login(data);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);
export const editProfile = createAsyncThunk(
  "user/edit",

  async function ({ data, token }, { rejectWithValue }) {
    try {
      return await instanceUserService.editProfile(data, token);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedIn(state) {
      state.isLoggedIn = true;
    },
    remove(state) {
      state.email = null;
      state.token = null;
      state.username = null;
      state.image = null;
      state.isLoggedIn = false;
    },
    clearRegisterData(state) {
      state.error = null;
      state.loading = false;
      state.registerStatus = "idle";
      state.loginStatus = "idle";
      state.editProfileStatus = "idle";
    },
    clearLoginData(state) {
      state.loginStatus = "idle";
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.registerStatus = "loading";
        state.error = null;
        state.loading = true;
        state.reloading = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.registerStatus = "loading";
        state.error = action.payload;
        state.loading = false;
        state.reloading = false;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.registerStatus = "succeeded";
        state.loading = false;
        state.reloading = false;
      })
      .addCase(login.pending, (state) => {
        state.loginStatus = "loading";
        state.error = null;
        state.error = null;
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.isLoggedIn = true;
        state.email = action.payload.user.email;
        state.token = action.payload.user.token;
        state.username = action.payload.user.username;
        state.image = action.payload.user.image;
        state.error = null;
        state.loading = false;
      })
      .addCase(editProfile.fulfilled, (state) => {
        state.editProfileStatus = "succeeded";
      })
      .addCase(editProfile.rejected, (state) => {
        state.editProfileStatus = "failed";
      })
      .addCase(editProfile.pending, (state) => {
        state.editProfileStatus = "loading";
      });
  },
});

export default userSlice.reducer;

export const { remove, create, loggedIn, clearRegisterData, clearLoginData } =
  userSlice.actions;
