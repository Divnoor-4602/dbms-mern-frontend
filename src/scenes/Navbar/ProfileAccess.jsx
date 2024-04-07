import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setLogout } from "@/state/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function ProfileAccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center gap-2 bg-zinc-900 px-6 py-1 rounded-lg text-white hover:bg-zinc-700 transition duration-300">
            <span className="mt-[1px]">Profile</span>
            <FontAwesomeIcon icon={faUserCircle} size="lg" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="space-x-2 cursor-pointer">
              <FontAwesomeIcon icon={faUser} />
              <span>Profile</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div
              className="space-x-2 cursor-pointer"
              onClick={() => {
                navigate("/");
                dispatch(setLogout());
              }}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <span>Logout</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
