import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IUserBody } from "./Login";
import { BiUpArrow } from "react-icons/bi";
import { FaSadTear } from "react-icons/fa";
import { CgLayoutList, CgLayoutGridSmall } from "react-icons/cg";
import UserResult from "../components/UserResult";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchUsers } from "../redux/searchSlice";
import ProfileData from "./ProfileData";

const hovered =
  "-bottom-8 w-auto absolute flex gap-1 flex-col h-full justify-center";
const unHovered =
  "h-full w-auto -bottom-20 -right-11 hidden absolute flex gap-1 flex-col w-full h-full justify-center";
const Search = () => {
  const data = useSelector((state: RootState) => state.search);
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {    
    dispatch(fetchUsers(searchParams.get("value")));
  }, [searchParams]);

  return (
    <>
      <div className="overflow-y-hidden lg:w-2/4  h-full border-r-2 border-main p-3 w-3/4">
        <div className="text-white text-4xl flex w-full justify-between items-center">
          <CgLayoutList cursor={"pointer"} className="hover:scale-125" />
          <h2 className="text-2xl text-white font-bold w-full flex justify-center items-center">
            Search Results
          </h2>
          <CgLayoutGridSmall cursor={"pointer"} className="hover:scale-125" />
        </div>

        <div className="overflow-y-auto h-full flex flex-col md:py-2 md:px-1 p-2 gap-4 w-full bg-layout">
          {data.loading == "succeeded" &&
            data.data!.map((item: IUserBody) => <UserResult item={item} />)}
        </div>
      </div>
    </>
  );
};

export default Search;
