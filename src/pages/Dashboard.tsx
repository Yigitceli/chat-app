import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex px-5 xl:px-13 py-3 bg-main">
      <div className="bg-layout w-full h-full rounded-md flex">
        <div className="w-1/4  h-full border-r-2 border-main">
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
        </div>
        <div className="w-2/4  h-full border-r-2 border-main p-3">
          <h2 className="text-2xl text-white font-bold w-full flex justify-center items-center">
            Hidayet
          </h2>
        </div>
        <div className="w-1/4  h-full ">
          <div className="text-white flex gap-2 items-center w-full justify-evenly p-3">
            <input
              type="text"
              className="w-full bg-layout focus:outline-none"
              placeholder="Search Members"
              autoComplete="off"
            />
            <AiOutlineSearch fontSize={24} className="text-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
