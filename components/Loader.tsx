import React from "react";

interface LoaderProps {
  size?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 4, color = "blue-400" }) => {
  const dotSize = `w-${size} h-${size}`;
  const dotColor = `bg-${color}`;

  return (
    <div className="flex items-center justify-center space-x-2">
      <div
        className={`dot ${dotSize} ${dotColor} rounded-full animate-bounce`}
      ></div>
      <div
        className={`dot ${dotSize} ${dotColor} rounded-full animate-bounce delay-200`}
      ></div>
      <div
        className={`dot ${dotSize} ${dotColor} rounded-full animate-bounce delay-400`}
      ></div>
    </div>
  );
};

export default Loader;
