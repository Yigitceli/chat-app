import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProfileData from "./pages/ProfileData";
import Register from "./pages/Register";
import Search from "./pages/Search";
import CheckProtectRouter from "./services/CheckProtectRoute";
import ProtectedRouter from "./services/ProtectedRoutes";

import { RootState } from "./store";

export default function App() {
  const { data } = useSelector((state: RootState) => state.user);

  return (
    <BrowserRouter>
      <div className="overflow-hidden bg-main w-full h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route element={<CheckProtectRouter />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRouter />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/search" element={<Search />} />   
            <Route path="/user/:id" element={<ProfileData/>}/>      
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
