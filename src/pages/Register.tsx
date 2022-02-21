import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signWithGoogle, signInWithTwitter } from "../../firebaseconfig";
import { BsTwitter } from "react-icons/bs";
import { UserCredential } from "firebase/auth";
import { setAccessToken, setRefreshToken } from "../services/authService";
import { Link } from "react-router-dom";
import FormInput from "../components/formInput";

export default function Register() {
  const [values, setValues] = useState<object | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
        <form className="flex flex-col gap-10 w-200 md:w-200">
          <div className="flex flex-col gap-3">
            <h2 className="text-white font-bold text-4xl">Register</h2>
            <p className="text-white">Fill the form for registiration.</p>
          </div>
          <div className="flex flex-col gap-4">
            <FormInput
              placeHolder="name@hotmail.com"
              name="email"
              type="email"
              id="email"
              label="Your Email"
              error="Email is not valid."
              onChange={onChange}
            />
            <FormInput
              placeHolder="Your Name"
              name="name"
              type="text"
              id="name"
              onChange={onChange}
              label="Name"
              error="Name can`t be empty."
            />
            <FormInput
              placeHolder="Your Surname"
              name="surname"
              type="text"
              id="surname"
              onChange={onChange}
              label="Surname"
              error="Surname can`t be empty."
            />
            <FormInput
              placeHolder="At least 8 character, number and symbols"
              name="password"
              type="password"
              id="password"
              onChange={onChange}
              label="Your Password"
              error="Password should be 8-20 characters and include at least 1 letter,
              1 number and 1 special character!"
            />
            <FormInput
              placeHolder="At least 8 character, number and symbols"
              name="verifyPassword"
              type="password"
              id="verify-password"
              label="Verify Your Password"
              error="Passwords do not match!"
              onChange={onChange}
            />
          </div>
          <label
            htmlFor="remember"
            className="flex items-center gap-4 text-white"
          >
            <input type="checkbox" name="remember" id="remember" />
            Accept the Terms and Conditions of the site and the information data
            policy.
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
