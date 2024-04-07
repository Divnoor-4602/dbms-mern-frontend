import React from "react";

// input classes
const inputValidClass =
  "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-slate-700 peer";

const inputInvalidClass =
  "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-red-600 appearance-none  focus:outline-none focus:ring-0 focus:border-red-600 peer ";

// label classes
const labelValidClass =
  "absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-slate-700  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto";

const labelInvalidClass =
  "absolute text-md text-red-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-red-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto";

export default function InputComponent({ label, id, error, ...props }) {
  return (
    <>
      <div className="relative w-full">
        <input
          id={id}
          {...props}
          className={error ? inputInvalidClass : inputValidClass}
        />
        <label
          htmlFor={id}
          className={error ? labelInvalidClass : labelValidClass}
        >
          {label}
        </label>
      </div>
    </>
  );
}
