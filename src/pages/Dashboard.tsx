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
import { fetchChats, recieveMsg } from "../redux/chatsSlice";
import { io } from "socket.io-client";
export const socket = io("http://localhost:5000");

const active = "top-0 md:hidden flex h-full absolute items-center right-0";
const disActive =
  "top-0 md:hidden flex  h-full absolute items-center -right-[17em]";

const Dashboard = () => {
  const { data } = useSelector((state: RootState) => state.user);
  const [isActive, setIsActive] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.userId) {
      socket.on("connect", () => {
        socket.emit("joined", { userId: data?.userId });
      });
    }
  }, [data]);

  useEffect(() => {
    dispatch(fetchChats());
  }, []);

  socket.on("recieveMessage", ({ newChat }) => {
    dispatch(recieveMsg(newChat));
  });

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
