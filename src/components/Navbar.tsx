import React, { ChangeEvent, useEffect, useState } from "react";
import { IoLogoSnapchat } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signWithGoogle, signInWithTwitter } from "../../firebaseconfig";
import { BsTwitter } from "react-icons/bs";
import { UserCredential } from "firebase/auth";
import { setAccessToken, setRefreshToken } from "../services/authService";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { RiNotification2Line } from "react-icons/Ri";
import { useForm } from "react-hook-form";
import axios from "../axios";
import SearchTab from "./SearchTab";
import { IUserBody } from "../pages/Login";
import { useDebounce } from "usehooks-ts";

type FormValues = {
  value: string;
};

const withUser = ` w-full flex items-center justify-between px-5 lg:px-13 py-3 bg-main backdrop-blur-sm`;
const withoutUser = `w-full flex items-center justify-center px-5 lg:px-13 py-3 bg-main backdrop-blur-sm`;

export default function Navbar() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<IUserBody[] | null>(null);
  const data = useSelector((state: RootState) => state.user);

  const debouncedValue = useDebounce<string>(searchValue, 300);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const fetchSearchResult = async () => {
    try {
      const { data } = await axios.get(`/user?value=${searchValue}`);
      const userData: IUserBody[] | null = data.payload;
      setSearchResult(userData);
    } catch (error) {
      setSearchResult(null);
    }
  };

  useEffect(() => {
    fetchSearchResult();
  }, [debouncedValue]);

  const FormSubmitHandler = async () => {};

  return (
    <div className={data.data ? withUser : withoutUser}>
      <div className="cursor-pointer flex items-center gap-1 hover:text-stone-400 text-white">
        <IoLogoSnapchat fontSize={35} />
        <h3>Chatlify</h3>
      </div>

      {data.data && (
        <ul className="flex gap-8 text-stone-400 font-bold items-center">
          <div className="relative flex flex-col">
            <form className="flex items-center bg-layout p-2 rounded-md ">
              <input
                type="text"
                className="bg-main bg-layout w-36 focus:outline-none focus:bg-layout"
                placeholder="Search"
                onChange={changeHandler}
                value={searchValue}
                autoComplete="off"
              />
              <AiOutlineSearch className="text-secondary text-xl" />
            </form>
            {searchResult && (
              <SearchTab data={searchResult} setData={setSearchResult} />
            )}
          </div>

          <span className="relative inline-block cursor-pointer hover:text-secondary">
            <RiNotification2Line className="text-2xl" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              99
            </span>
          </span>
          <img
            className="rounded-full w-11 cursor-pointer"
            src={data.data.avatar}
            alt="Profil Picture"
          />
        </ul>
      )}
    </div>
  );
}
