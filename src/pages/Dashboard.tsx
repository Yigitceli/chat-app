import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { IUserBody } from "./Login";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import Search from "./Search";
import axios from "../axios";
import { setData } from "../redux/chatSlice";
import { fetchChats } from "../redux/chatsSlice";

const active = "top-0 md:hidden flex h-full absolute items-center right-0";
const disActive =
  "top-0 md:hidden flex  h-full absolute items-center -right-[17em]";

const Dashboard = () => {
  const { data } = useSelector((state: RootState) => state.user);
  const [isActive, setIsActive] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChats());
  }, []);

  return (
    <>
      <div className="w-4/6 md:w2/4 rounded-tr-md rounded-br-md  h-full border-r-2 border-main p-2 bg-layout">
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;

/**/
