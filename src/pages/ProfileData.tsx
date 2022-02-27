import React, { useEffect } from "react";
import { FaSadTear } from "react-icons/fa";
import { IUserBody } from "./Login";
import UserResult from "../components/UserResult";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useSearchParams } from "react-router-dom";
import { fetchUser } from "../redux/searchSlice";
import Loading from "../services/Loading";
import { AiOutlineUserAdd } from "react-icons/ai";
import axios from "../axios";
import { addFriend } from "../redux/userSlice";

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
    dispatch(fetchUser(searchParams.get("id")));
  }, [searchParams]);

  const handleClick = async () => {
    const { data } = await axios.put("user/add-friend", profileData);
    dispatch(addFriend(profileData!));    
  };

  return (
    <div className="w-full h-full flex text-white relative">
      <button className="absolute top-3 right-3" onClick={handleClick}>
        {data?.friends.some((item) => item.userId == profileData?.userId) ||
          (profileData?.userId !== data?.userId && (
            <AiOutlineUserAdd fontSize={28} className="hover:text-3xl" />
          ))}
      </button>
      <div className="text-white flex flex-col md:gap-5 gap-2 w-full p-3 items-center">
        <Loading loading={loading}>
          <h1 className="text-3xl w-100 flex justify-center">
            {profileData?.displayName}
          </h1>
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
          <div className="flex flex-col items-center gap-1 h-full">
            <h3 className="font-extrabold text-secondary">Friends</h3>
            <div className="w-full flex flex-col h-full overflow-y-auto">
              {profileData?.friends.length! > 0 ? (
                profileData?.friends.map((item: IUserBody) => (
                  <UserResult item={item} />
                ))
              ) : (
                <div className="gap-4 w-full flex flex-col items-center justify-center h-full justify-center">
                  <FaSadTear fontSize={32} />
                  <h3>User has no friend yet!</h3>
                </div>
              )}
            </div>
          </div>
        </Loading>
      </div>
    </div>
  );
};

export default ProfileData;
