import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { IUserBody } from "../pages/Login";

export interface IPersonChat {
  user: IUserBody;
  chat: string;
  createdAt: Date;
}

export interface IChat {
  users: IUserBody[];
  chats: IPersonChat[];
}

export const fetchChats = createAsyncThunk("chats/fetchChats", async () => {
  try {
    const { data } = await axios.get("/chat");
    return <IChat[]>data.payload;
  } catch (error) {}
});

interface IChatsState {
  data: IChat[] | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: IChatsState = {
  data: null,
  loading: "idle",
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChats.pending, (state, action) => {
      state.loading = "pending";
      state.data = null;
    });
    builder.addCase(fetchChats.rejected, (state, action) => {
      state.loading = "failed";
      state.data = null;
    });
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.data = action.payload!;
    });
  },
});

export default chatsSlice.reducer;
