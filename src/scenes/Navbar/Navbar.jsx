import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSun,
  faMoon,
  faMessage,
  faBell,
  faQuestion,
  faUserCircle,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

import Sidebar from "./Sidebar.jsx";
import ProfileAccess from "./ProfileAccess.jsx";
import { useSelector } from "react-redux";

export default function Navbar() {
  const userDetails = useSelector((state) => state.userSlice);
  const isLogged = userDetails.loggedIn;
  console.log(isLogged);

  return (
    <>
      {isLogged ? (
        <>
          {/* navbar */}
          <div className="px-10 py-5 font-Roboto">
            {/* navbar container */}
            <div className="flex justify-between w-full items-center">
              <div className="flex gap-8">
                {/* app heading */}
                <h1 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
                  Devstagram
                </h1>
                {/* search bar */}
                <div className="hidden lg:flex items-center">
                  <input
                    className="w-80 py-1 px-3 border-y border-l rounded-l-xl focus-visible:outline-none"
                    placeholder="Search"
                  />
                  <div className="border-y border-r py-1 px-2 rounded-r-xl group bg-gray-50 cursor-pointer">
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="group-hover:scale-105 "
                    />
                  </div>
                </div>
              </div>
              {/* profile access */}
              <div className="flex items-center gap-8">
                <div className="hidden lg:block">
                  <ProfileAccess />
                </div>
                <div className="hidden lg:flex items-center gap-8">
                  {/* edit buttons */}
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" className="rounded-xl">
                      <FontAwesomeIcon icon={faSun} size="xl" />
                    </Button>
                    <Button variant="ghost" className="rounded-xl">
                      <FontAwesomeIcon icon={faMessage} size="xl" />
                    </Button>
                    <Button variant="ghost" className="rounded-xl">
                      <FontAwesomeIcon icon={faBell} size="xl" />
                    </Button>
                    <Button variant="ghost" className="rounded-xl">
                      <FontAwesomeIcon icon={faQuestion} size="xl" />
                    </Button>
                  </div>
                </div>
              </div>
              <Sidebar />
            </div>
          </div>
          <Outlet />
          <Toaster />
        </>
      ) : (
        <>
          <div className="px-10 py-5 font-Roboto">
            <div className="flex justify-center items-center gap-4">
              <FontAwesomeIcon icon={faCode} size="2x" />
              {/* app heading */}
              <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
                Devstagram
              </h1>
            </div>
          </div>
          <Outlet />
          <Toaster />
        </>
      )}
    </>
  );
}
