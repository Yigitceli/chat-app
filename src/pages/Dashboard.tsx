import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { IUserBody } from "./Login";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

const active = "md:hidden flex w-2/4 h-full absolute items-center translate-x-[108.5%]"
const disActive = "md:hidden flex w-2/4 h-full absolute items-center translate-x-[199%]"

const Dashboard = () => {
  const { data } = useSelector((state: RootState) => state.user);
  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <>
      <div className="w-4/6 md:w2/4 rounded-tr-md rounded-br-md md:rounded-none h-full border-r-2 border-main p-3 bg-layout">
        <h2 className="text-2xl text-white font-bold w-full flex justify-center items-center">
          Hidayet
        </h2>
      </div>
      <div className="hidden md:flex flex-col w-1/4 h-full bg-layout rounded-tr-md rounded-br-md">
        <div className="text-white flex gap-2 items-center w-full justify-evenly p-3">
          <input
            type="text"
            className="w-full bg-layout focus:outline-none"
            placeholder="Search a Friend"
            autoComplete="off"
          />
          <AiOutlineSearch fontSize={24} className="text-secondary" />
        </div>
        <div className="px-3 flex flex-col gap-2 ">
          {data?.friends.map((item: IUserBody) => (
            <div className=" p-2  rounded-lg w-full flex items-center gap-2 text-secondary bg-main hover:scale-110 font-bold cursor-pointer">
              <img src={item.avatar} className="w-10 rounded-full" />{" "}
              <h3>{item.displayName}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile */}

      <div className={isActive ? active : disActive}>
        {!isActive ? <MdOutlineArrowBackIos
          className="cursor-pointer text-secondary rounded-tl-2xl rounded-bl-2xl"          
          fontSize={28}
          onClick={() => setIsActive(!isActive)}          
        /> :<MdOutlineArrowForwardIos
        className="cursor-pointer text-secondary rounded-tl-2xl rounded-bl-2xl"          
        fontSize={28}
        onClick={() => setIsActive(!isActive)}          
      /> }
        <div className="border-2 border-main bg-layout md:static md:rounded-tr-md rounded-br-md  h-full">
          <div className="text-white flex gap-2 items-center w-full justify-evenly p-3">
            <input
              type="text"
              className="w-full bg-layout focus:outline-none"
              placeholder="Search a Friend"
              autoComplete="off"
            />
            <AiOutlineSearch fontSize={24} className="text-secondary" />
          </div>
          <div className="px-3 flex flex-col gap-2 ">
            {data?.friends.map((item: IUserBody) => (
              <div className="p-2 rounded-lg w-full flex items-center gap-2 text-secondary bg-main hover:scale-110 font-bold cursor-pointer">
                <img src={item.avatar} className="w-10 rounded-full" />{" "}
                <h3>{item.displayName}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

/**/
