import React, { useEffect, useRef } from "react";
import { IUserBody } from "../pages/Login";
import { FiMoreHorizontal } from "react-icons/Fi";
import { useOnClickOutside } from "usehooks-ts";
interface IProps {
  data: IUserBody[] | null;
  setData: (e: null | IUserBody[]) => void;
}

const SearchTab: React.FC<IProps> = ({ data, setData }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    data && setData(null);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div
      ref={ref}
      className="bg-layout gap-2 flex flex-col w-full absolute rounded-md top-11 shadow-xl"
    >
      {data?.slice(0, 3).map((item) => (
        <span className="hover:bg-main py-1 rounded-md cursor-pointer flex items-center justify-evenly w-full">
          <img src={item.avatar} className="w-10 rounded-full" />
          <span className="">{item.displayName}</span>
        </span>
      ))}
      <span className="w-full flex justify-center cursor-pointer rounded-md hover:bg-main">
        <FiMoreHorizontal fontSize={24} />
      </span>
    </div>
  );
};

export default SearchTab;
