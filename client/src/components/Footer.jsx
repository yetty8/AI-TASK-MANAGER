// src/components/Footer.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { dark } = useTheme();
  return (
    <footer className={`${dark ? "bg-gray-900 text-gray-300" : "bg-white text-gray-700"} border-t w-full`}>
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm">
        <div>© {new Date().getFullYear()} AI Task Manager by Yetty — Built with ❤️</div>
        <div className="text-xs text-gray-500 mt-1">Your data is stored securely in MongoDB</div>
      </div>
    </footer>
  );
};

export default Footer;
