import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import { Button } from "@/components/ui/button";
import { addFriend, removeFriend } from "@/utils/RepeatedRequests";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setFriends } from "@/state/user/userSlice";
import { useToast } from "@/components/ui/use-toast";
import Skeletoncard from "./Skeletoncard.jsx";

export default function PostCard({
  firstName,
  lastName,
  location,
  postId,
  userPicturePath,
  postPicturePath,
  postContent,
  likes,
  comments,
  friendId,
  onLike,
}) {
  // function to add friends
  const postUserID = friendId;
  const postsId = postId;
  const userDetails = useSelector((state) => state.userSlice);
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    for (const key in userDetails.user.friends) {
      const friend = userDetails.user.friends[key];

      if (friend.id || friend._id === postUserID) {
        setIsAdded(true);
        break;
      } else {
        setIsAdded(false);
      }
    }
    if (userDetails.user.friends.length === 0) {
      setIsAdded(false);
    }
  }, [userDetails]);

  const updateFriend = async () => {
    if (isAdded) {
      console.log("removing friend");
      try {
        const response = await removeFriend(userDetails.user.id, postUserID);

        dispatch(setFriends({ friends: response }));
        toast({
          variant: "primary",
          title: "Friend removed 😢",
          description: `You have removed ${firstName} ${lastName} from your friends list.`,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await addFriend(userDetails.user.id, postUserID);
        dispatch(setFriends({ friends: response }));

        toast({
          variant: "primary",
          title: "✨ Friend Added ✨",
          description: `You have Added ${firstName} ${lastName} to your friends list.`,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const likePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/like/${postsId}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            userId: userDetails.user.id,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      onLike(postsId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* post card container */}
      <div className="flex flex-col gap-4 shadow-xl rounded-xl p-4 ">
        {/* post heading */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            {/* avatar */}
            <img
              src={`http://localhost:8080/assets/${userPicturePath}`}
              crossOrigin="anonymous"
              className="h-12 w-12 aspect-square object-cover rounded-full shadow-sm"
            />

            {/* name / location */}
            <div className="flex flex-col gap-1">
              <div className="text-sm font-semibold">
                {firstName} {lastName}
              </div>
              <div className="text-xs opacity-60">{location}</div>
            </div>
          </div>
          {/* add / remove friend icon */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={updateFriend}
          >
            {isAdded ? (
              <FontAwesomeIcon icon={faUserMinus} className="text-gray-500" />
            ) : (
              <FontAwesomeIcon icon={faUserPlus} className="text-gray-500" />
            )}
          </Button>
        </div>
        {/* post content */}
        <div className={!postContent ? "hidden" : "block text-sm"}>
          {postContent}
        </div>
        {/* post image if exists */}
        <div>
          <img
            src={`http://localhost:8080/assets/${postPicturePath}`}
            alt="post image"
            className="aspect-square object-cover rounded-xl shadow-sm"
            crossOrigin="anonymous"
          />
        </div>
        {/* post actions: likes / comments */}
        <div className="flex gap-8 ml-1">
          <div className="flex gap-2 items-center" onClick={() => likePost()}>
            <FontAwesomeIcon
              icon={faHeart}
              className="cursor-pointer hover:scale-105 duration-300 transition"
            />
            <span>{likes}</span>
          </div>
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon
              icon={faComment}
              className="cursor-pointer hover:scale-105 duration-300 transition"
            />
            <span>{comments}</span>
          </div>
        </div>

        <div></div>
      </div>
    </>
  );
}
