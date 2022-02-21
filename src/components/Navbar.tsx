import React, { useState } from "react";
import { IoLogoSnapchat } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { signWithGoogle, signInWithTwitter } from "../../firebaseconfig";
import { BsTwitter } from "react-icons/bs";
import { UserCredential } from "firebase/auth";
import { setAccessToken, setRefreshToken } from "../services/authService";

const withUser = ` w-full flex items-center justify-between px-5 lg:px-13 py-3 bg-main backdrop-blur-sm`;
const withoutUser = `w-full flex items-center justify-center px-5 lg:px-13 py-3 bg-main backdrop-blur-sm`;

export default function Navbar() {
  const [user, setUser] = useState<UserCredential | null>(null);

  const signIn = async (authType: string) => {
    try {
      if (authType === "google") {
        const data: UserCredential | null = await signWithGoogle();
        setAccessToken(await data.user.getIdToken());
        setRefreshToken(data.user.refreshToken);
      } else if (authType === "twitter") {
        const data: UserCredential | null = await signInWithTwitter();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={user ? withUser : withoutUser}>
      <IoLogoSnapchat
        className="hover:text-stone-400 text-white"
        fontSize={35}
        cursor={"pointer"}
      />
      {user && (
        <ul className="flex gap-3 text-stone-400 font-bold">
          <li>TEST</li>
          <li>TEST</li>
          <li>TEST</li>
          <li>TEST</li>
          <li>TEST</li>
          <li>TEST</li>
        </ul>
      )}      
    </div>
  );
}
