import React, { useEffect } from "react";
import { FaSadTear } from "react-icons/fa";
import { IUserBody } from "./Login";
import UserResult from "../components/UserResult";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Link, useSearchParams } from "react-router-dom";
import { fetchUser } from "../redux/searchSlice";
import Loading from "../services/Loading";
import { AiOutlineUserAdd } from "react-icons/ai";
import axios from "../axios";
import { BsFillChatDotsFill } from "react-icons/bs";

const ProfileData: React.FC = () => {
  const {
    profileData,
    loading,
  }: {
    profileData: IUserBody | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
  } = useSelector((state: RootState) => state.search);
  const { data } = useSelector((state: RootState) => state.user);
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchParams.get("id")) {
      dispatch(fetchUser(searchParams.get("id")));
    }
  }, [searchParams]);

  return (
    <>
      <div className="w-full h-full flex text-white relative">
        <button className="absolute top-3 right-3"></button>
        <div className="text-white flex flex-col md:gap-5 gap-2 w-full p-3 items-center">
          <Loading loading={loading}>
            {!profileData ? (
              <h1>There is no user with this ID!</h1>
            ) : (
              <>
                <h1 className="text-3xl w-100 flex justify-center">
                  {profileData?.displayName}
                </h1>
                <Link
                  to={`/chat/${profileData.userId}`}
                  state={profileData}
                  className="absolute right-5 text-2xl hover:scale-110 transition-all ease-in-out delay-10"
                >
                  <BsFillChatDotsFill />
                </Link>
                <img src={profileData?.avatar} className=" w-32 rounded-full" />
                <div className="flex flex-col items-center gap-1">
                  <h3 className="font-extrabold text-secondary">Email</h3>
                  <h2>{profileData?.email}</h2>
                </div>
                <hr className="w-full" />
                <div className="flex flex-col items-center gap-1">
                  <h3 className="font-extrabold text-secondary">Name</h3>
                  <h2>{profileData?.displayName}</h2>
                </div>
                <hr className="w-full" />
                <div className="flex flex-col items-center gap-1 h-full"></div>
              </>
            )}
          </Loading>
        </div>
      </div>
    </>
  );
};

export default ProfileData;
