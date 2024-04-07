import React from "react";
import notFound from "../src/assets/notfound.svg";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-12 md:items-center w-3/4">
          <div className="hidden md:block">
            <img src={notFound} alt="404 Not Found" className="h-96" />
          </div>
          <div className="flex flex-col gap-8 md:mt-20">
            <div className="text-white bg-slate-700 px-3 py-2 md:w-1/2 text-center rounded-full font-semibold">
              Page not found!
            </div>
            <div className="text-6xl font-bold text-slate-800">
              Oh No! Error 404
            </div>
            <div className="text-2xl opacity-50">
              You have reached outer space, click below to go back!
            </div>
            {/* go back to homepage button */}
            <Link
              to="/"
              className="w-full bg-cyan-700 text-white py-3 rounded-xl mt-4 font-semibold hover:bg-cyan-600 transition hover:-translate-y-1 duration-300 text-center"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
