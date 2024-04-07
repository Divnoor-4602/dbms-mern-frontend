import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSun,
  faMoon,
  faMessage,
  faBell,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "@/state/user/userSlice";

export default function Sidebar() {
  const menuBtn = useRef();
  const menu = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function navToggle() {
    menuBtn.current.classList.toggle("open");
    menu.current.classList.toggle("hidden");
    menu.current.classList.toggle("flex");
  }

  return (
    <>
      {/* hamburger button */}
      <div className="lg:hidden mt-1">
        <button
          type="button"
          className="hamburger z-40 block lg:hidden focus:outline-none"
          ref={menuBtn}
          onClick={navToggle}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>
      {/* sidebar menu */}
      <div
        className="absolute bottom-0 top-20 right-0 z-20 hidden w-3/4 sm:w-1/2 bg-white shadow-xl rounded-lg p-8 lg:hidden"
        ref={menu}
      >
        <div className="flex flex-col items-center gap-8 w-full ">
          {/* edit buttons */}
          <div className="flex flex-col items-center gap-8 justify-center w-full">
            <Button variant="ghost" className="sidebar-nav-buttons group">
              <FontAwesomeIcon
                icon={faSun}
                className="group-hover:scale-105 transition duration-200"
              />
              <span>Theme</span>
            </Button>
            <Button variant="ghost" className="sidebar-nav-buttons group">
              <FontAwesomeIcon
                icon={faMessage}
                className="group-hover:scale-105 transition duration-200"
              />
              <span>Messaging</span>
            </Button>
            <Button variant="ghost" className="sidebar-nav-buttons group">
              <FontAwesomeIcon
                icon={faBell}
                className="group-hover:scale-105 transition duration-200"
              />
              <span>Notifications</span>
            </Button>
            <Button variant="ghost" className="sidebar-nav-buttons group">
              <FontAwesomeIcon
                icon={faQuestion}
                className="group-hover:scale-105 transition duration-200"
              />
              <span>Questions</span>
            </Button>
          </div>
          {/* profile access */}
          <div className="w-full flex justify-center">
            <Button
              variant="secondary"
              onClick={() => {
                navToggle();
                navigate("/");
                dispatch(setLogout());
              }}
              className="w-full"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
