import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard, { socket } from "./pages/Dashboard";
import Login from "./pages/Login";
import ProfileData from "./pages/ProfileData";
import Register from "./pages/Register";
import Search from "./pages/Search";
import CheckProtectRouter from "./services/CheckProtectRoute";
import ProtectedRouter from "./services/ProtectedRoutes";
import { useOutletContext } from "react-router-dom";
import { RootState } from "./store";
import Chat from "./pages/Chat";

export default function App() {
  const { data } = useSelector((state: RootState) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <div className="overflow-auto relative bg-main w-full h-screen flex flex-col">
        <Navbar setIsOpen={setIsOpen}/>
        <Routes>
          <Route element={<CheckProtectRouter />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRouter setIsOpen={setIsOpen}/>}>
            <Route
              path="/"
              element={<Dashboard isOpen={isOpen} setIsOpen={setIsOpen} />}
            >
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="/search" element={<Search />} />
              <Route path="/user/:id" element={<ProfileData />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
