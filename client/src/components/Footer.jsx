// src/components/Footer.jsx
// client/src/components/Footer.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { dark } = useTheme();

  return (
    <footer
      className={`${
        dark ? "bg-gray-900 text-gray-300" : "bg-white text-gray-700"
      } border-t w-full mt-10`}
    >
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm">
        <div>© {new Date().getFullYear()} Yetty AI Task Manager — Powered by AI</div>
        <div className="text-xs text-gray-500 mt-1">
          Your tasks are stored securely in MongoDB.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
