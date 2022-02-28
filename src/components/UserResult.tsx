import React, { useState } from "react";
import { BiUpArrow } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IUserBody } from "../pages/Login";
import { setProfileData } from "../redux/searchSlice";

interface IProps {
  item: IUserBody;
}

const hovered =
  "-bottom-10 w-auto absolute flex gap-1 flex-col h-full justify-center";

const UserResult: React.FC<IProps> = ({ item }) => {
  const [hover, setHover] = useState<boolean>(false);
  const dispatch = useDispatch();

  return (
    <>
      <Link to={`/user/${item.userId}`}>
        <div
          onClick={(e) => dispatch(setProfileData(item))}
          className="hover:scale-95 cursor-pointer text-white w-full rounded-lg p-4 bg-main flex justify-between items-center h-28"
         
        >
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
      </Link>
    </>
  );
};

export default UserResult;
