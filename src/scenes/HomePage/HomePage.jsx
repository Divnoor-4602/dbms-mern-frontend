import React from "react";
import ProfileCard from "./ProfileCard.jsx";
import PostFeed from "./PostFeed.jsx";
import SponsoredAds from "./SponsoredAds.jsx";
import FriendList from "./FriendList.jsx";

export default function HomePage() {
  return (
    <>
      {/* homepage container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 min-h-screen bg-zinc-50 py-8 px-4 gap-4 min-h-100">
        <div className="col-span-1">
          <ProfileCard />
        </div>
        {/* post feed */}
        <div className="lg:col-span-2">
          <PostFeed />
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <SponsoredAds />
          <FriendList />
        </div>
      </div>
    </>
  );
}
