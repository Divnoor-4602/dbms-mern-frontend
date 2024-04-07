import React from "react";
import advertisementImg from "../../assets/advertisement.jpg";

export default function SponsoredAds() {
  return (
    <>
      {/* sponsored ads container */}
      <div className="bg-white font-Roboto p-4 rounded-xl shadow-lg flex flex-col gap-4">
        {/* ad header */}
        <div className="flex justify-between items-center">
          <div className="font-semibold text-sm">Sponsored</div>
          <div className="cursor-pointer text-xs opacity-70">Create Ad</div>
        </div>
        {/* ad content */}
        <div>
          <img
            src={advertisementImg}
            alt="advertisement"
            className="aspect-video object-cover rounded-xl shadow-sm"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm opacity-70">Div Travelling Services</div>
          <div className="text-xs opacity-60">div@gmail.com</div>
        </div>
        <div className="text-xs opacity-60">
          Embark on unforgettable journeys with our premier travel agency.
        </div>
      </div>
    </>
  );
}
