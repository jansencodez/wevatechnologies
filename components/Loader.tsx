import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="dot-loader w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
      <div className="dot-loader w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-200"></div>
      <div className="dot-loader w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-400"></div>
    </div>
  );
}

export default Loader;
