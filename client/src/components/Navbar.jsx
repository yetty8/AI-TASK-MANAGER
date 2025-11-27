import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { FiMoon, FiSun, FiHome, FiGrid, FiInfo } from "react-icons/fi";
import { motion } from "framer-motion";

const Navbar = ({ onSearch }) => {
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className={`w-full border-b ${dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-lg font-semibold text-blue-600 dark:text-blue-400"
            aria-label="Home"
          >
            <FiGrid className="w-6 h-6" />
            AI Task Manager
          </button>
        </div>

        <div className="flex-1 mx-6">
          <input
            onChange={(e) => onSearch && onSearch(e.target.value)}
            placeholder="Search tasks, prompts or results..."
            className="w-full max-w-xl rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Search tasks"
          />
        </div>

        <div className="flex items-center space-x-3">
          <Link to="/" className="hidden md:flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300">
            <FiHome /> Home
          </Link>
          <Link to="/dashboard" className="hidden md:flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300">
            <FiGrid /> Dashboard
          </Link>
          <Link to="/learn-more" className="hidden md:flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300">
            <FiInfo /> Learn
          </Link>

          <button
            onClick={toggle}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <FiSun className="w-5 h-5 text-yellow-400" /> : <FiMoon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
