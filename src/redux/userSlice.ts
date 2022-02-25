import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Avatar from "react-avatar";
import axios from "axios";
import Axios from "../axios";
import { IUserBody } from "../pages/Login";
import {
  getAuthType,
  setAccessToken,
  setAuthType,
  setRefreshToken,
} from "../services/authService";
import { UserCredential } from "firebase/auth";
import { signWithGoogle } from "../../firebaseconfig";

interface IUserState {
  data: IUserBody | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

interface ILoginBody {
  accessToken: string;
  data: IUserBody;
  refreshToken: string;
}

export const userSignIn = createAsyncThunk(
  "user/userSignIn",
  // if you type your function argument here
  async (
    userData: {
      email: string;
      bodyPassword: string;
    },
    thunkAPI
  ) => {
    try {
      setAuthType("custom");
      let response = await axios.post(
        "http://localhost:5000/user/login",
        userData,
        {
          headers: {
            authtype: getAuthType()!,
          },
        }
      );
      const data: ILoginBody = response.data.payload;
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      const returnData: IUserBody = {
        userId: data.data.userId,
        avatar: data.data.avatar,
        email: data.data.email,
        displayName: data.data.displayName,
        friends: data.data.friends,
      };
      return returnData as IUserBody;
    } catch (error) {}
  }
);

export const userSignInSocial = createAsyncThunk(
  "user/userSignInSocial",
  // if you type your function argument here
  async (authType: string, thunkAPI) => {
    try {
      const data: UserCredential | null = await signWithGoogle();
      setAccessToken(await data.user.getIdToken());
      setRefreshToken(data.user.refreshToken);
      setAuthType(authType);

      const response = await Axios.post("/user/login");
      const userData: IUserBody = response.data.payload;      
      return userData;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: IUserState = {
  data: null,
  loading: "idle",
};

const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    signInAction: (state, action: PayloadAction<IUserBody>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSignIn.pending, (state, action) => {
      state.loading = "pending";
      state.data = null;
    });
    builder.addCase(userSignIn.rejected, (state, action) => {
      state.loading = "failed";
      state.data = null;
    });
    builder.addCase(userSignIn.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.data = action.payload!;
    });
    builder.addCase(userSignInSocial.pending, (state, action) => {
      state.loading = "pending";
      state.data = null;
    });
    builder.addCase(userSignInSocial.rejected, (state, action) => {
      state.loading = "failed";
      state.data = null;
    });
    builder.addCase(userSignInSocial.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.data = action.payload!;
    });
  },
});

export const { signInAction } = userSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export default userSlice.reducer;
