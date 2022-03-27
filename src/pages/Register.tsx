import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signWithGoogle, signInWithTwitter } from "../../firebaseconfig";
import { BsTwitter } from "react-icons/bs";
import { sendPasswordResetEmail, UserCredential } from "firebase/auth";
import {
  getAuthType,
  setAccessToken,
  setRefreshToken,
} from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { get, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";


type FormValues = {
  email: string;
  name: string;
  surname: string;
  password: string;
  verifyPassword: string;
  checkBox: boolean;
};

export default function Register() {
 const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const FormSubmitHandler: SubmitHandler<FormValues> = async (
    data: FormValues
  ) => {
    const response = await axios.post("https://chatlify-yigit-backend.herokuapp.com/user/register", {
      email: data.email,
      password: data.password,
      name: data.name,
      surname: data.surname,
      authType: "custom",
    });
    navigate("/login")
    
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
          className="flex flex-col gap-10 w-200 md:w-200"
          onSubmit={handleSubmit(FormSubmitHandler)}
        >
          <div className="flex flex-col gap-3">
            <h2 className="text-white font-bold text-4xl">Register</h2>
            <p className="text-white">Fill the form for registiration.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <label className="text-white test">Your Email</label>
              <input
                className="focus:outline-none rounded-md py-2 px-2 invalid:border-red-500"
                placeholder="name@hotmail.com"
                type="text"
                id="email"
                {...register("email", {
                  required: true,
                  pattern: RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
                })}
              />
              {errors.email && (
                <span className="text-secondary">Email is not valid.</span>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-white test">Name</label>
              <input
                className="focus:outline-none rounded-md py-2 px-2 invalid:border-red-500"
                placeholder="Your Name"
                type="text"
                id="name"
                {...register("name", { required: true, minLength: 2 })}
              />
              {errors.name && (
                <span className="text-secondary">Name can`t be empty.</span>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-white test">Surname</label>
              <input
                className="focus:outline-none rounded-md py-2 px-2 invalid:border-red-500"
                placeholder="Your Surname"
                type="text"
                id="surname"
                {...register("surname", { required: true, minLength: 2 })}
              />
              {errors.surname && (
                <span className="text-secondary">Surname can`t be empty.</span>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-white test">Your Password</label>
              <input
                className="focus:outline-none rounded-md py-2 px-2 invalid:border-red-500"
                placeholder="Min 8 - Max 20 character"
                type="text"
                id="password"
                {...register("password", {
                  required: true,
                  pattern: RegExp(
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.-_])(?=.{8,})"
                  ),
                })}
              />
              {errors.password && (
                <span className="text-secondary">
                  Password should be 8-20 characters and include at least 1
                  lowercase, 1 uppercase, 1 number and 1 special character!
                </span>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-white test">Verify Your Password</label>
              <input
                className="focus:outline-none rounded-md py-2 px-2 invalid:border-red-500"
                placeholder="At least 8 character, number and symbols"
                type="password"
                id="verifyPassword"
                {...register("verifyPassword", {
                  required: true,
                  validate: (value) => value === getValues("password"),
                })}
              />
              {errors.verifyPassword && (
                <span className="text-secondary">Passwords do not match!</span>
              )}
            </div>
          </div>
          <label
            htmlFor="remember"
            className="flex gap-1 items-center text-white flex-col"
          >
            <div className="flex gap-4 items-center">
              <input
                type="checkbox"
                id="checkbox"
                {...register("checkBox", { required: true })}
              />
              <span>
                Accept the Terms and Conditions of the site and the information
                data policy.
              </span>
            </div>
            {errors.checkBox && (
              <span className="text-secondary">You have to accept terms.</span>
            )}
          </label>

          <button
            type="submit"
            className="bg-secondary w-full rounded-md p-1 py-2 text-white font-bold"
          >
            Sign Up
          </button>
          <p className="text-white">
            Already registered?
            <Link
              to={"/login"}
              className="cursor-pointer hover:text-white underline underline-offset-1 text-blue-500"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
