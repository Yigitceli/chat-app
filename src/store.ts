import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { useDispatch } from "react-redux";
import userSlice from "./redux/userSlice";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "user",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); //

export default store;
