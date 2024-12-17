import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="loader w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;
