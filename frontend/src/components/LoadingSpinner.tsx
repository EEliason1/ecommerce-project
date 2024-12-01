import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-24">
      <div className="w-12 h-12 border-4 border-t-green-forest border-gray-light rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
