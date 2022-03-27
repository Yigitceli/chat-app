import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { IUserBody } from "./Login";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { ImCross } from "react-icons/im";
import Search from "./Search";
import axios from "../axios";
import { setData } from "../redux/chatSlice";
import { fetchChats, recieveMsg } from "../redux/chatsSlice";
import { io } from "socket.io-client";
export const socket = io("https://chatlify-yigit-backend.herokuapp.com");

const active = "top-0 md:hidden flex h-full absolute items-center right-0";
const disActive =
  "top-0 md:hidden flex  h-full absolute items-center -right-[17em]";

interface IProps {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
}
const Dashboard: React.FC<IProps> = ({ isOpen, setIsOpen }) => {
  const { data } = useSelector((state: RootState) => state.user);
  const [isActive, setIsActive] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  socket.on("writting", (data) => {});

  const clickHandler = () => {    
    navigate("/");
    setIsOpen(false);
  };

  return (
    <>
      <div className="w-4/6 hidden md:block rounded-tr-md rounded-br-md  h-full border-r-2 border-main p-2 bg-layout">
        <Outlet />
      </div>
      {isOpen && (
        <div className="md:w-4/6 md:hidden block absolute md:static w-full rounded-md h-full border-r-2 border-main p-2 bg-layout">
          <button
            className="md:hidden absolute top-5 left-5"
            onClick={clickHandler}
          >
            <ImCross color="white" />
          </button>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default Dashboard;

/**/
