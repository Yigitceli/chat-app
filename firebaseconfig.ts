import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  UserCredential,
} from "firebase/auth";

interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const firebaseConfig: IFirebaseConfig = {
  apiKey: "AIzaSyAHAbDUb_u3jXyaxaT1ksMAT38KgnNkOwE",
  authDomain: "chat-app-f368c.firebaseapp.com",
  projectId: "chat-app-f368c",
  storageBucket: "chat-app-f368c.appspot.com",
  messagingSenderId: "902485990233",
  appId: "1:902485990233:web:c1b9594cba9a9c9cd90a48",
};

const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
export const auth = getAuth();

export const signWithGoogle = async (): Promise<UserCredential> => {
  const googleUserData = await signInWithPopup(auth, googleProvider);
  return googleUserData;
};
export const signInWithTwitter = async (): Promise<UserCredential> => {
  const twitterUserData = await signInWithPopup(auth, twitterProvider);
  return twitterUserData;
};
