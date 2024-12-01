import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-green-light to-green-forest text-white p-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; 2024 E-Commerce App. All rights reserved.</p>
        <nav className="mt-4 space-x-4">
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
