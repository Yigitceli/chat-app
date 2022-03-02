import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { useDispatch } from "react-redux";
import userSlice from "./redux/userSlice";
import { persistReducer } from "redux-persist";
import searchSlice from "./redux/searchSlice";
import chatsSlice from "./redux/chatsSlice";
import chatSlice from "./redux/chatSlice";

const persistConfig = {
  key: "user",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
  reducer: {
    user: persistedReducer,
    search: searchSlice,
    chats: chatsSlice,
    chat: chatSlice
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); //

export default store;
