import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
import Login, { IUserBody } from "../pages/Login";
import { IChat, IPersonChat } from "../redux/chatsSlice";
import { RootState } from "../store";

const findOther = (item: IChat, mainUser: IUserBody | null): IUserBody => {
  const result = item.users.find(
    (item: IUserBody) => item.userId != mainUser?.userId
  );
  return result!;
};

const ProtectedRouter = () => {
  const data = useSelector((state: RootState) => state.user);
  const chatsData = useSelector((state: RootState) => state.chats);
  const isLoggedIn: boolean = !!data.data;
  return isLoggedIn ? (
    <div className="overflow-hidden w-full h-full flex flex-1 px-1 xl:px-[20rem] py-2 bg-main">
      <div className="w-full rounded-md flex">
        <div className="bg-layout w-2/6 h-full border-r-2 border-main rounded-tl-md rounded-bl-md">
          <div className="flex flex-col items-center">
            <div className="text-white flex gap-2 items-center w-full justify-evenly p-3 focus:outline-none">
              <input
                type="text"
                className="w-full bg-layout focus:outline-none"
                placeholder="Search Chats"
                autoComplete="off"
              />
              <AiOutlineSearch fontSize={24} className="text-secondary" />
            </div>
          </div>
          <div className="w-full p-1 px-2 ">
            {chatsData.data?.map((item) => {
              return (
                <Link to={`/chat/${findOther(item, data.data).userId}`}>
                  <button className="text-secondary font-bold bg-main p-2 rounded-md hover:scale-105 w-full flex items-center gap-4">
                    <img
                      src={findOther(item, data.data)?.avatar}
                      className="w-10 rounded-full"
                    />
                    <div className="flex flex-col items-start">
                      <p className="text-white">
                        {findOther(item, data.data)?.displayName}
                      </p>
                      <p>
                        {item.chats[item.chats.length - 1].chat.slice(0, 15)}...
                      </p>
                    </div>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};
export default ProtectedRouter;
