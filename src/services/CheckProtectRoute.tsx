import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { RootState } from "../store";

const CheckProtectRouter: React.FC = () => {
  const data = useSelector((state: RootState) => state.user);
  const isLoggedIn: boolean = !!data.data;
  return <>{isLoggedIn ? <Navigate to={"/"} /> : <Outlet />}</>;
};
export default CheckProtectRouter;
