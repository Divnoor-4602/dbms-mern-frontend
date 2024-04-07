import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLocationDot,
  faSuitcase,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

import { faXTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";

export default function ProfileCard() {
  const userDetails = useSelector((state) => state.userSlice);
  const [currentUserDetails, setCurrentUserDetails] = useState(null);
  const [userFriends, setUserFriends] = useState([]);

  // fetch the friend list of current user

  useEffect(() => {
    const getCurrentUserFriends = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/friends/${userDetails.user.id}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setUserFriends(responseData.friends);
      } catch (error) {
        console.log(error);
      }
    };

    getCurrentUserFriends();
  }, [userDetails]);

  useEffect(() => {
    // get user details to populate the profile card
    const getUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${userDetails.user.id}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setCurrentUserDetails(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    getUserDetails();
  }, [userDetails]);

  let profileImgPath =
    currentUserDetails !== null && currentUserDetails.user.picturePath;

  return (
    <>
      {/* profile card container */}
      <div className="flex flex-col bg-white shadow-xl rounded-lg p-6 font-Roboto gap-4">
        {/* card heading */}
        <div className="flex gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <img
              src={`http://localhost:8080/assets/${profileImgPath}`}
              crossOrigin="anonymous"
              className="h-12 w-12 aspect-square object-cover rounded-full shadow-sm"
            />
            <div className="flex flex-col">
              <div className="font-semibold">
                {userDetails.user.firstName + " " + userDetails.user.lastName}{" "}
              </div>
              <div className="text-sm opacity-50">
                {userFriends.length} friends
              </div>
            </div>
          </div>
          <FontAwesomeIcon
            icon={faUser}
            className="text-gray-400 hover:text-black transition duration-300 hover:scale-105 cursor-pointer border border-gray-200 p-2 rounded-full hover:bg-gray-100"
          />
        </div>
        <hr />
        {/* card body */}
        <div className="flex flex-col gap-4 mx-2">
          {/* location profile */}
          <div className="flex gap-4 items-center">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="text-black"
              size="xl"
            />
            <div className="text-sm ml-1 text-gray-500">Chandigarh</div>
          </div>
          {/* occupation */}
          <div className="flex gap-4 items-center">
            <FontAwesomeIcon
              icon={faSuitcase}
              className="text-black"
              size="xl"
            />
            <div className="text-sm text-gray-500">Software Engineer</div>
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-4">
          {/* profile views */}
          <div className="flex justify-between">
            <div className="text-sm opacity-60">Whose viewed your profile</div>
            <div className="text-sm font-light">
              {currentUserDetails != null &&
                currentUserDetails.user.viewedProfile}
            </div>
          </div>
          {/* post impressions */}
          <div className="flex justify-between">
            <div className="text-sm opacity-60">Impressions of your post</div>
            <div className="text-sm font-light">
              {currentUserDetails != null &&
                currentUserDetails.user.impressions}
            </div>
          </div>
        </div>
        <hr />
        {/* Social Profiles */}
        <div className="flex flex-col gap-4">
          <div className="font-semibold opacity-70">Social Profiles</div>
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <FontAwesomeIcon
                icon={faXTwitter}
                size="xl"
                className="text-gray-500 hover:text-black transition duration-300 cursor-pointer"
              />
              <div className="flex flex-col text-sm opacity-60">
                <div>Twitter</div>
                <div>Social Media Platform</div>
              </div>
            </div>
            <FontAwesomeIcon
              icon={faPencil}
              className="text-gray-400 cursor-pointer hover:text-black duration-300 transition"
            />
          </div>
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <FontAwesomeIcon
                icon={faLinkedin}
                size="2x"
                className="text-gray-500 hover:text-blue-600 transition duration-300 cursor-pointer"
              />
              <div className="flex flex-col text-sm opacity-60">
                <div>LinkedIn</div>
                <div>Networking Platform</div>
              </div>
            </div>
            <FontAwesomeIcon
              icon={faPencil}
              className="text-gray-400 cursor-pointer hover:text-black duration-300 transition"
            />
          </div>
        </div>
      </div>
    </>
  );
}
