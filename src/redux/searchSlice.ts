import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios";

import { IUserBody } from "../pages/Login";

export const fetchUsers = createAsyncThunk(
  "search/fetchUsers",
  // if you type your function argument here
  async (searchValue: string | null, thunkAPI) => {
    try {
      const { data } = await axios.get(`/user?value=${searchValue}`);
      const userData: IUserBody[] | null = data.payload;
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "search/fetchUser",
  // if you type your function argument here
  async (userId: string | null, thunkAPI) => {
    try {
      const { data } = await axios.get(`/user/:${<string>userId}`);
      const userData: IUserBody | null = data.payload;
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  }
);

interface IState {
  data: null | IUserBody[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  profileData: IUserBody | null;
}

const initialState: IState = {
  data: null,
  loading: "idle",
  profileData: null,
};

const searchSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.data = null;
      state.loading = "pending";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.data = null;
      state.loading = "failed";
    });
    builder.addCase(fetchUser.pending, (state, action) => {
        state.data = null;
        state.loading = "pending";
      });
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.profileData = action.payload;
        state.loading = "succeeded";
      });
      builder.addCase(fetchUser.rejected, (state, action) => {
        state.data = null;
        state.loading = "failed";
      });
  },
});

export const { setProfileData } = searchSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export default searchSlice.reducer;
