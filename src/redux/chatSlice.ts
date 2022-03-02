import { createSlice } from "@reduxjs/toolkit";
import { IUserBody } from "../pages/Login";

interface IPersonChat {
  user: IChatBody;
  chat: string;
  createdAt: Date;
}

interface IChatBody {
  data: {
    userData?: IUserBody;
    chatData?: IPersonChat[];
  };
}

const initialState: IChatBody = {
  data: {},
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
