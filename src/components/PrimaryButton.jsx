import React from "react";

function PrimaryButton({ children }) {
  return (
    <>
      <button className="w-64 py-3 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 my-10">
        {children}
      </button>
      </>
   
  );
}

export default PrimaryButton;
