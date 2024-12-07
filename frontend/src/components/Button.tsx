import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, ...rest }) => {
  return (
    <button
      onClick={onClick}
      {...rest}
      className={`px-4 py-2 rounded text-white ${
        rest.disabled
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-green-500 hover:bg-green-600"
      }`}
    >
      {label}
    </button>
  );
};

export default Button;
