import React, { useEffect, useRef } from "react";
import { IUserBody } from "../pages/Login";
import { CgMore } from "react-icons/Cg";
import { useOnClickOutside } from "usehooks-ts";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
interface IProps {
  data: IUserBody[] | null;
  setData: (e: null | IUserBody[]) => void;
  value: string;
  setSearchValue: (e: string) => void;
}

const SearchTab: React.FC<IProps> = ({
  data,
  setData,
  value,
  setSearchValue,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClickOutside = () => {
    data && setData(null);
    setSearchValue("");
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div
      ref={ref}
      className="bg-layout absolute z-50 gap-2 flex flex-col w-full rounded-md top-11 shadow-xl"
    >
      {data?.slice(0, 3).map((item) => (
        <Link to={`/user/${item.userId}`}>
          <span className="relative hover:bg-main py-1 rounded-md cursor-pointer flex items-center justify-evenly w-full">
            <img src={item.avatar} className="w-10 rounded-full" />
            <span className="">{item.displayName}</span>
          </span>
        </Link>
      ))}

      <Link to={`/search?value=${value}`}>
        <span className="w-full flex justify-center cursor-pointer rounded-md hover:bg-main">
          <CgMore fontSize={24} />
        </span>
      </Link>
    </div>
  );
};

export default SearchTab;
