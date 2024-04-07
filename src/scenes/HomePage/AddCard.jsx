import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  faImage,
  faPaperclip,
  faMicrophone,
  faFilm,
  faSquarePlus,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "@/state/user/userSlice";

export default function AddCard() {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState(null);
  const userDetails = useSelector((state) => state.userSlice);
  const [isDropzoneActive, setIsDropzoneActive] = useState(false);
  const [postPicture, setPostPicture] = useState("");
  const [postContent, setPostContent] = useState("");
  const posts = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  const handlePostPicture = (picture) => {
    setPostPicture(picture);
  };

  const handlePostContent = (content) => {
    setPostContent(content);
  };

  const handleIsDropzoneActive = () => {
    setIsDropzoneActive(!isDropzoneActive);
  };

  useEffect(() => {
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

        setCurrentUser(responseData);
      } catch (error) {
        throw new Error(responseData.message);
      }
    };
    getUserDetails();
  }, [userDetails]);

  // function to add a post to the feed
  const addNewPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", userDetails.user.id);
    formData.append("description", postContent);
    formData.append("picturePath", postPicture.name);
    formData.append("picture", postPicture);

    try {
      const response = await fetch("http://localhost:8080/api/posts/create", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      dispatch(setPosts({ posts: [...posts.posts, responseData.post] }));

      // on successful post, reset the post content and picture
      handlePostContent("");
      handlePostPicture("");
      handleIsDropzoneActive();
    } catch (error) {
      console.log(error);
    }
  };

  let profileImgPath = currentUser !== null && currentUser.user.picturePath;

  return (
    <>
      {/* post create container */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            {/* avatar */}
            <img
              src={`http://localhost:8080/assets/${profileImgPath}`}
              crossOrigin="anonymous"
              className="h-12 w-12 aspect-square object-cover rounded-full shadow-sm"
            />

            {/* input post content */}
            <div className="w-full">
              <input
                placeholder="What's on your mind?"
                className="w-full bg-gray-100 py-3 px-4 rounded-full placeholder:text-sm text-sm  focus-visible:outline-none"
                onChange={(e) => handlePostContent(e.target.value)}
                value={postContent}
              ></input>
            </div>
          </div>
          <hr />
          {/* dropzone when a post option is selected */}

          {/* Choose a picture */}
          {isDropzoneActive && (
            <>
              <Dropzone
                multiple={false}
                onDrop={(acceptedFiles) => {
                  handlePostPicture(acceptedFiles[0]);
                  console.log(acceptedFiles[0]);
                }}
              >
                {({ getRootProps, getInputProps, isFocused }) => (
                  <div
                    {...getRootProps()}
                    className={
                      isFocused
                        ? "border border-blue-600 border-dashed p-4 rounded-xl flex justify-between"
                        : "border border-black border-dashed p-4 rounded-xl flex justify-between"
                    }
                  >
                    {postPicture === "" ? (
                      <label className="text-sm opacity-60">
                        Select media for your post
                      </label>
                    ) : (
                      <label className="text-sm">{postPicture.name}</label>
                    )}

                    <input {...getInputProps()} name="picture" />
                    <button onClick={() => handlePostPicture("")}>
                      <FontAwesomeIcon icon={faXmarkSquare} className="xl" />
                    </button>
                  </div>
                )}
              </Dropzone>
            </>
          )}

          {/* post actions */}
          <div className="flex justify-between">
            {/* image button */}
            <div className="text-gray-500">
              <Button
                variant="ghost"
                className="flex gap-1"
                onClick={handleIsDropzoneActive}
              >
                <FontAwesomeIcon icon={faImage} />
                <span className="hidden md:block">Image</span>
              </Button>
            </div>
            {/* Clip button */}
            <div className="text-gray-500">
              <Button variant="ghost" className="flex gap-1">
                <FontAwesomeIcon icon={faFilm} />
                <span className="hidden md:block">Clip</span>
              </Button>
            </div>
            {/* Attatchment button */}
            <div className="text-gray-500">
              <Button variant="ghost" className="flex gap-1">
                <FontAwesomeIcon icon={faPaperclip} />
                <span className="hidden md:block">Attatchment</span>
              </Button>
            </div>
            {/* Audio button */}
            <div className="text-gray-500">
              <Button variant="ghost" className="flex gap-1">
                <FontAwesomeIcon icon={faMicrophone} />
                <span className="hidden md:block">Audio</span>
              </Button>
            </div>
            {/* post button */}
            <div className="">
              <Button
                className="flex gap-2 rounded-full"
                onClick={(e) => {
                  if (postContent === "") {
                    toast({
                      variant: "destructive",
                      title: "Cannot post empty content",
                      description: "Please enter some content to post!",
                      action: (
                        <ToastAction altText="Try again">Try again</ToastAction>
                      ),
                    });
                  } else {
                    toast({
                      title: "Successfully posted",
                      description: "Your post has been successfully posted",
                      variant: "success",
                    });
                    addNewPost(e);
                  }
                }}
              >
                <FontAwesomeIcon icon={faSquarePlus} />
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
