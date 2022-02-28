import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoLogoSnapchat } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signWithGoogle, signInWithTwitter } from "../../firebaseconfig";
import { BsTwitter } from "react-icons/bs";
import { getAuth, UserCredential } from "firebase/auth";
import {
  getAuthType,
  setAccessToken,
  setRefreshToken,
  signout,
} from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { RiNotification2Line } from "react-icons/Ri";
import { useForm } from "react-hook-form";
import axios from "../axios";
import SearchTab from "./SearchTab";
import { IUserBody } from "../pages/Login";
import { useDebounce } from "usehooks-ts";
import { Link, useNavigate } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import { signOutAction } from "../redux/userSlice";

const withUser = `w-full flex items-center justify-between px-5 lg:px-13 py-3 bg-main backdrop-blur-sm`;
const withoutUser = `w-full flex items-center justify-center px-5 lg:px-13 py-3 bg-main backdrop-blur-sm`;

export default function Navbar() {
  const ref = useRef(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<IUserBody[] | null>(null);
  const data = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const debouncedValue = useDebounce<string>(searchValue, 250);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const signOut = () => {
    if (getAuthType() == "custom") {
      signout();
      dispatch(signOutAction());
      navigate("/login");
    } else {
      signout();
      dispatch(signOutAction());
      getAuth().signOut();
      navigate("/login");
      setOpen(false);
    }
  };

  const handleClickOutside = () => {
    if (open == true) {
      setOpen(false);
    }
  };

  useOnClickOutside(ref, handleClickOutside, "mousedown");

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
    if (debouncedValue) {
      fetchSearchResult();
    }
  }, [debouncedValue]);

  const FormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?value=${searchValue}`);
    setSearchResult(null);
  };

  return (
    <div className={data.data ? withUser : withoutUser}>
      <Link to={"/"}>
        <div className="cursor-pointer flex items-center gap-1 hover:text-stone-400 text-white">
          <IoLogoSnapchat fontSize={35} />
          <h3>Chatlify</h3>
        </div>
      </Link>

      {data.data && (
        <ul className="flex gap-8 text-stone-400 font-bold items-center">
          <div className="relative flex flex-col">
            <form
              onSubmit={FormSubmitHandler}
              className="flex items-center bg-layout p-2 rounded-md "
            >
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
              <SearchTab
                value={searchValue}
                data={searchResult}
                setData={setSearchResult}
                setSearchValue={setSearchValue}
              />
            )}
          </div>

          <span className="relative inline-block cursor-pointer hover:text-secondary">
            <RiNotification2Line className="text-2xl" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              99
            </span>
          </span>
          <div className="relative">
            <img
              className="rounded-full w-11 cursor-pointer hover:scale-110"
              src={data.data.avatar}
              alt="Profil Picture"
              onMouseDown={() => setOpen(!open)}
            />

            {open && (
              <div
                ref={ref}
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="flex flex-col gap-1 w-full" role="none">
                  <button className="flex justify-start rounded-sm w-full hover:text-white hover:bg-main text-gray-700 block px-4 py-2 text-sm">
                    Account settings
                  </button>
                  <button className="flex justify-start rounded-sm w-full hover:text-white hover:bg-main text-gray-700 block px-4 py-2 text-sm">
                    Support
                  </button>
                  <button className="flex justify-start rounded-sm w-full hover:text-white hover:bg-main text-gray-700 block px-4 py-2 text-sm">
                    License
                  </button>
                  <button
                    className="font-bold rounded-sm w-full hover:text-white hover:bg-main text-gray-700 block w-full text-left px-4 py-2 text-sm"
                    onClick={signOut}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </ul>
      )}
    </div>
  );
}
