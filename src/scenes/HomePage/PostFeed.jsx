import React, { useState, useEffect } from "react";
import AddCard from "./AddCard.jsx";
import PostCard from "./PostCard.jsx";
import { useSelector } from "react-redux";
import Skeletoncard from "./Skeletoncard.jsx";

export default function PostFeed() {
  const posts = useSelector((state) => state.userSlice);
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // function to fetch all the current posts in the post database
    const getAllPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8080/api/posts/feed", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        setIsLoading(false);
        console.log(responseData);
        setAllPosts((prevValue) => responseData.posts);
      } catch (error) {
        console.log(error);
      }
    };

    getAllPosts();
  }, [posts]);

  const handlePostlikes = (postId) => {
    console.log("handling post likes");
    for (const key in allPosts) {
      if (allPosts[key]._id === postId) {
        // checking if like already exists, if the like is present remove the like
        if (allPosts[key].likes[posts.user.id]) {
          delete allPosts[key].likes[posts.user.id];
          setAllPosts([...allPosts]);
          return;
        }

        allPosts[key].likes[posts.user.id] = true;
        setAllPosts([...allPosts]);
        break;
      }
    }
  };

  return (
    <>
      {/* post feed container */}
      <div className="flex flex-col gap-8 font-Roboto">
        {/* making a post card */}
        <AddCard />
        {/* get all current posts in a website */}

        <div className="flex flex-col gap-4 bg-white rounded-xl">
          {/* map through all the posts and display them */}
          {isLoading
            ? Array(10)
                .fill(1)
                .map((_, index) => <Skeletoncard key={index} />)
            : allPosts.map((post) => {
                console.log(post.description);
                return (
                  <PostCard
                    key={post._id}
                    postId={post._id}
                    userPicturePath={post.userPicturePath}
                    firstName={post.firstName}
                    lastName={post.lastName}
                    location={post.location}
                    postContent={post.description}
                    postPicturePath={post.picturePath}
                    likes={Object.keys(post.likes).length}
                    comments={post.comments.length}
                    friendId={post.userId}
                    onLike={handlePostlikes}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
}
