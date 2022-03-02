import axios from "../axios";
import React, { useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useParams } from "react-router-dom";
import { IChat, IPersonChat } from "../redux/chatsSlice";
import { IUserBody } from "./Login";

type FormValues = {
  chat: string;
};

const findChat = (
  id: string | undefined,
  data: IChat[] | null
): IChat | undefined => {
  const chat = data?.find((item: IChat) => {
    return item.users.some((item2: IUserBody) => item2.userId == id);
  });
  return chat;
};

const findUser = (data: IChat | undefined, id: string | undefined): IUserBody | undefined => {
  const user = data?.users.find((item: IUserBody) => item.userId == id);
  return user;
};

function Chat() {
  const { data } = useSelector((state: RootState) => state.chats);
  let params = useParams();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const FormSubmitHandler: SubmitHandler<FormValues> = async (
    loginData: FormValues
  ) => {
    const response = await axios.put(`/chat/${params.id}`, {
      chatText: "TEST",
    });
  };

  useEffect(() => {
    findChat(params.id, data);
  }, [params, data]);

  return (
    <div className="bg-main flex flex-col w-full h-full rounded-md">
      <div className="p-2 flex flex-[1] items-center justify-start gap-3">
        <img className="w-10 rounded-full" src={findUser(findChat(params.id, data), params.id)?.avatar} />
        <h2 className="text-white text-xl">{findUser(findChat(params.id, data), params.id)?.displayName}</h2>
      </div>
      <hr className="w-full"/>
      <div className="w-full flex flex-[23] h-96 flex overflow-auto py-6 px-5 flex-auto flex-col gap-2">
        {findChat(params.id, data)?.chats.map((item: IPersonChat) => {
          return (
            <>
              {item.user.userId == params.id ? (
                <div className="w-full">
                  <div className="inline-flex items-center bg-layout text-white p-2 rounded-md inline-block">
                    <div className="w-3 h-3 absolute -left-[0.45rem] top-1 bg-layout rotate-45 transform origin-bottom-left"></div>
                    <span>{item.chat}</span>
                  </div>
                </div>
              ) : (
                <div className="w-full justify-end flex">
                  <div className="inline-flex relative z-10items-center bg-white text-secondary p-2 rounded-md inline-block">
                    <div className="w-3 h-3 absolute -right-[0.15rem] z-10 top-1 bg-white rotate-45 transform origin-bottom-left"></div>
                    <span >{item.chat}</span>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
      <hr className="w-full" />
      <form
        onSubmit={handleSubmit(FormSubmitHandler)}
        className="w-full flex p-2 gap-2 items-center text-white"
      >
        <input
          type={"text"}
          className="focus:outline-none w-full bg-main h-full"
          placeholder="Type here"
          {...register("chat")}
        />
        <IoIosSend fontSize={24} className="cursor-pointer hover:scale-110" />
      </form>
    </div>
  );
}

export default Chat;
