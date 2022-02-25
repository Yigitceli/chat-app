import React, { useState } from "react";
import { BiUpArrow } from "react-icons/bi";
import { IUserBody } from "../pages/Login";

interface IProps {
  item: IUserBody;
}

const hovered =
  "-bottom-10 w-auto absolute flex gap-1 flex-col h-full justify-center";

const UserResult: React.FC<IProps> = ({ item }) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <>
      <div className="hover:scale-95 cursor-pointer text-white w-full rounded-lg drop-shadow-2xl p-4 bg-main flex justify-between items-center">
        <img src={item.avatar} className="w-24 rounded-full" />
        <div className="flex flex-col items-center">
          <h3 className="text-secondary font-extrabold">Email</h3>
          <h2>{item.email}</h2>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-secondary font-extrabold">Name</h3>
          <h2>{item.displayName}</h2>
        </div>
      </div>
    </>
  );
};

export default UserResult;

{
  /*
  <div
    onMouseLeave={(e) => setHover(false)}
    className="md:w-20 w-14 md:h-20 h-14 relative cursor-pointer"
  >
    <div className="h-44 absolute top-0 left-0 bottom-0 right-0 flex flex-col items-center">
      <div
        onMouseEnter={(e) => setHover(true)}
        className=" relative flex gap-4 justify-between items-center flex-col"
      >
        <img
          src={item.avatar}
          className={
            hover
              ? "md:w-20 w-14 rounded-full scale-125"
              : "md:w-20 w-14 rounded-full"
          }
        />
      </div>
      <div className={hover ? hovered : "hidden"}>
        <div className="flex w-full justify-center text-white">
          <BiUpArrow />
        </div>
        <div className="flex flex-col text-main bg-white p-1 rounded-lg drop-shadow-3xl">
          <h3 className="font-extrabold text-sm">{item.email}</h3>
          <h2 className="text-sm">{item.displayName}</h2>
        </div>
      </div>
    </div>
  </div>*/
}
