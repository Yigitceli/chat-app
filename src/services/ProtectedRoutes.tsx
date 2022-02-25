import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import { RootState } from "../store";

const ProtectedRouter = () => {
  const data = useSelector((state: RootState) => state.user);
  const isLoggedIn: boolean = !!data.data;
  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};
export default ProtectedRouter;
