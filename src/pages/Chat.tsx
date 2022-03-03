import axios from "../axios";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useParams } from "react-router-dom";
import { IChat, IPersonChat } from "../redux/chatsSlice";
import { IUserBody } from "./Login";
import InputEmoji from "react-input-emoji";
import { socket } from "./Dashboard";

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

const findUser = (
  data: IChat | undefined,
  id: string | undefined
): IUserBody | undefined => {
  const user = data?.users.find((item: IUserBody) => item.userId == id);
  return user;
};

function Chat() {
  const [text, setText] = useState<string>("");
  const dispatch = useDispatch();
  async function handleOnEnter(text: string) {
    socket.emit("sendMessage", {
      chatUserId: params.id,
      user: user.data,
      chatText: text,
    });    
  }
  const { data } = useSelector((state: RootState) => state.chats);
  const user = useSelector((state: RootState) => state.user);
  let params = useParams();
  useEffect(() => {}, [params, data]);

  return (
    <div className="relative bg-main flex flex-col w-full h-full rounded-md">
      <div className="p-2 flex items-center justify-start gap-3">
        <img
          className="w-10 rounded-full"
          src={findUser(findChat(params.id, data), params.id)?.avatar}
        />
        <h2 className="text-white text-xl">
          {findUser(findChat(params.id, data), params.id)?.displayName}
        </h2>
      </div>
      <hr className="w-full" />
      <div className="w-full flex flex-[100rem] h-96 flex overflow-auto py-6 px-5 flex-auto flex-col gap-2">
        {findChat(params.id, data)?.chats.map((item: IPersonChat) => {
          return (
            <>
              {item.user.userId == params.id ? (
                <div className="w-full">
                  <div className="inline-flex z-10 relative items-center bg-layout text-white p-2 rounded-md inline-block">
                    <div className="w-3 h-3 absolute -left-[0.45rem] top-1 bg-layout rotate-45 transform origin-bottom-left"></div>
                    <span>{item.chat}</span>
                  </div>
                </div>
              ) : (
                <div className="w-full justify-end flex">
                  <div className="inline-flex relative z-10 items-center bg-white text-secondary p-2 rounded-md inline-block">
                    <div className="w-3 h-3 absolute -right-[0.15rem] z-10 top-1 bg-white rotate-45 transform origin-bottom-left"></div>
                    <span>{item.chat}</span>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
      <hr className="w-full" />
      <form className="w-full flex p-2 gap-2 items-center text-white">
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
          className="bg-main"
        />
        <button type="submit">
          <IoIosSend fontSize={24} className="cursor-pointer hover:scale-110" />
        </button>
      </form>
    </div>
  );
}

export default Chat;
