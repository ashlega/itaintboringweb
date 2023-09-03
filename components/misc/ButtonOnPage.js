import React from "react";

const ButtonOnPage = ({ children, addClass, onClick, isEnabled=true }) => {
  var enabled = isEnabled;
  return (
    <>
     {isEnabled ? (
      <button
        className={
          "font-medium tracking-wide mx-2 py-1 px-2 sm:px-8 border border-blue-500 text-blue-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-blue-500 hover:text-white-500 transition-all hover:shadow-blue-500 " +
          addClass
        }
        onClick={onClick}
      >
        {children}
      </button>

    ):(
      <button
        className={
          "font-medium tracking-wide mx-2 py-1 px-2 sm:px-8 border border-neutral-600 text-white-500 bg-gray-400 outline-none rounded-l-full rounded-r-full capitalize transition-all "+ 
          addClass
        }
      >
        {children}
      </button>
    )}
    </>

    
  );
};

export default ButtonOnPage;
