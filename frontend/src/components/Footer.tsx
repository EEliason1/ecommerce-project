import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <p>&copy; {new Date().getFullYear()} E-Commerce. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
