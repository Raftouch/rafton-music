import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="text-rafton-blue bg-white p-2 border hover:scale-110 rounded-md shadow-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
