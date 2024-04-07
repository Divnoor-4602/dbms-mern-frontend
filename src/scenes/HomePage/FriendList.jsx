import React, { Suspense, useEffect, useState } from "react";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { removeFriend } from "@/utils/RepeatedRequests";
import { setFriends } from "@/state/user/userSlice";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import SkeletonFriend from "./SkeletonFriend.jsx";

export default function FriendList() {
  const userDetails = useSelector((state) => state.userSlice);
  const [userFriends, setUserFriends] = useState([]);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUserFriends = async () => {
      try {
        setLoading(true);
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
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getCurrentUserFriends();
  }, [userDetails]);

  const removeFriends = async (postUserId) => {
    try {
      const response = await removeFriend(userDetails.user.id, postUserId);
      dispatch(setFriends({ friends: response }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* friend list container */}
      <div className="rounded-xl shadow-lg bg-white p-4 flex flex-col gap-4">
        {/* heading */}
        <div className="font-semibold text-sm">Friend list</div>
        {loading &&
          Array(5)
            .fill(1)
            .map((_, index) => <SkeletonFriend key={index} />)}
        {userFriends.map((friend) => {
          console.log(friend);
          return (
            <div className="flex justify-between items-center" key={friend.id}>
              <div className="flex gap-4 items-center">
                {/* avatar */}
                <img
                  src={`http://localhost:8080/assets/${friend.picturePath}`}
                  crossOrigin="anonymous"
                  className="h-12 w-12 aspect-square object-cover rounded-full shadow-sm"
                />
                {/* name / location */}
                <div className="flex flex-col">
                  <div className="text-xs font-semibold">
                    {friend.firstName}
                  </div>
                  <div className="text-xs opacity-60">{friend.location}</div>
                </div>
              </div>
              {/* add / remove friend icon */}
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => {
                  removeFriends(friend.id);
                  toast({
                    title: `${friend.firstName} Removed 😢`,
                    description: "Friend removed from profile",
                    variant: "primary",
                  });
                }}
              >
                <FontAwesomeIcon
                  icon={faUserMinus}
                  className="text-gray-500"
                  size="xs"
                />
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
}
