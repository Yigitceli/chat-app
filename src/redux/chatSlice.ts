import { createSlice } from "@reduxjs/toolkit";
import { IUserBody } from "../pages/Login";
import { IChat } from "./chatsSlice";

interface IPersonChat {
  user: IChatBody;
  chat: string;
  createdAt: Date;
}

interface IChatBody {
  data: IChat | undefined;
  
}

const initialState: IChatBody = {
  data: undefined,  
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = chatSlice.actions;
export default chatSlice.reducer;
