import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signWithGoogle, signInWithTwitter } from "../../firebaseconfig";
import { BsTwitter } from "react-icons/bs";
import { UserCredential } from "firebase/auth";
import { setAccessToken, setRefreshToken } from "../services/authService";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const signIn = async (authType: string) => {
    try {
      if (authType === "google") {
        const data: UserCredential | null = await signWithGoogle();
        setAccessToken(await data.user.getIdToken());
        setRefreshToken(data.user.refreshToken);
      } else if (authType === "twitter") {
        const data: UserCredential | null = await signInWithTwitter();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const FormSubmitHandler: SubmitHandler<FormValues> = (data: FormValues) => {
    
  };

  return (
    <div className="flex-1 lg:items-center justify-center w-full flex h-full p-5 lg:gap-12 gap-3 flex-col lg:flex-row">
      <div className="md:flex  hidden flex-col h-full w-full lg:w-1/2 lg:p-12 justify-center items-center">
        <h1 className="w-full text-center text-white tracking-widte text-5xl leading-relaxed">
          Be In Touch With Everyone!
        </h1>
        <div className="w-full lg:my-10 my-1"></div>
        <h1 className="w-full text-center text-white tracking-widte text-5xl leading-relaxed">
          Share Every Moment With Your Friends!
        </h1>
      </div>
      <div className="flex flex-col h-full w-full lg:w-1/2 justify-center items-center">
        <form
          className="flex flex-col gap-10 w-100 md:w-200"
          onSubmit={handleSubmit(FormSubmitHandler)}
        >
          <div className="flex flex-col gap-3">
            <h2 className="text-white font-bold text-4xl">Login</h2>
            <p className="text-white">
              Login with your data that you entered during registiration.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-white">Your Email</label>
            <input
              className="rounded-md py-2 px-2"
              placeholder="name@hotmail.com"
              type="text"
              id="email"
              {...register("email", { minLength: 8 })}
            />
            {errors.email && (
              <span className="text-secondary">Email is not valid.</span>
            )}
            <label className="text-white">Your Password</label>
            <input
              className="rounded-md py-2 px-2"
              placeholder="At least 8 character"
              type="password"
              id="password"
              {...register("password", { minLength: 8 })}
            />
            {errors.email && (
              <span className="text-secondary">
                Password must be longer than 8 character.
              </span>
            )}
            <label
              htmlFor="remember"
              className="flex items-center gap-2 text-white"
            >
              <input type="checkbox" {...register("remember")} id="remember" />
              Keep me logged in
            </label>
          </div>

          <button
            type="submit"
            className="bg-secondary w-full rounded-md p-1 py-2 text-white font-bold"
          >
            Sign In
          </button>
          <p className="text-white">
            Not a member?
            <Link
              to={"/register"}
              className="cursor-pointer hover:text-white underline underline-offset-1 text-blue-500"
            >
              Sign Up
            </Link>
          </p>
        </form>
        <hr className="w-full my-10" />
        <div className="flex flex-col gap-6 w-100 md:w-200">
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              signIn("google")
            }
            className="bg-white w-full flex items-center justify-center p-2 rounded-full"
          >
            <FcGoogle fontSize={24} />
          </button>
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              signIn("twitter")
            }
            className="bg-black w-full flex items-center justify-center p-2 rounded-full"
          >
            <BsTwitter fontSize={24} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}
