import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IUserBody } from "./Login";
import { BiUpArrow } from "react-icons/bi";
import { CgLayoutList, CgLayoutGridSmall } from "react-icons/cg";
import UserResult from "../components/UserResult";

const hovered =
  "-bottom-8 w-auto absolute flex gap-1 flex-col h-full justify-center";
const unHovered =
  "h-full w-auto -bottom-20 -right-11 hidden absolute flex gap-1 flex-col w-full h-full justify-center";
const Search = () => {
  const [data, setData] = useState<IUserBody[] | null>();
  let [searchParams, setSearchParams] = useSearchParams();

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`/user?value=${searchParams}`);
      const userData: IUserBody[] | null = data.payload;
      setData(userData);
    } catch (error) {
      setData(null);
    }
  };

  useEffect(() => {
    console.log(searchParams.get("value"));
  }, [searchParams]);

  useEffect(() => {
    fetchUsers();
  }, [searchParams]);

  return (
    <>
      <div className="overflow-hidden lg:w-2/4  h-full border-r-2 border-main p-3 w-3/4">
        <div className="text-white text-4xl flex w-full justify-between items-center">
          <CgLayoutList cursor={"pointer"} className="hover:scale-125" />
          <h2 className="text-2xl text-white font-bold w-full flex justify-center items-center">
            Search Results
          </h2>
          <CgLayoutGridSmall cursor={"pointer"} className="hover:scale-125" />
        </div>
        <div className="overflow-y-auto overflow-x-hidden h-full flex md:py-2 md:px-1 p-2 flex-wrap gap-4">
          {data && data.map((item: IUserBody) => <UserResult item={item} />)}
          {data && data.map((item: IUserBody) => <UserResult item={item} />)}
          {data && data.map((item: IUserBody) => <UserResult item={item} />)}
          {data && data.map((item: IUserBody) => <UserResult item={item} />)}
        </div>
      </div>
      <div className="w-1/4 h-full lg:flex hidden">
        <div className="text-white flex gap-2 items-center w-full justify-evenly p-3"></div>
      </div>
    </>
  );
};

export default Search;
