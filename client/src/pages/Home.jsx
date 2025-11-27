import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { dark } = useTheme();
  const navigate = useNavigate();
  const [recentTasks, setRecentTasks] = useState([]);
  const [typedText, setTypedText] = useState("");

  const greeting = "Hi! I'm Yetty, your AI Task Manager. Ask me anything!";

  // Typing animation effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(greeting.slice(0, index + 1));
      index++;
      if (index === greeting.length) clearInterval(interval);
    }, 50); // 50ms per character
    return () => clearInterval(interval);
  }, []);

  // Fetch recent tasks
  const fetchRecentTasks = async () => {
    try {
      const res = await fetch("http://localhost:5002/api/tasks");
      const data = await res.json();
      setRecentTasks(data.slice(0, 3)); // show last 3 tasks
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecentTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center px-4 py-10">
      {/* Hero Section */}
      <div className="max-w-3xl text-center bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-lg mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          {typedText}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6">
          Generate, track, and manage your tasks efficiently with AI.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition transform hover:scale-105"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate("/learn-more")}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 px-6 py-3 rounded-lg font-medium shadow-md transition transform hover:scale-105"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Recent Tasks Section */}
      <div className="max-w-4xl w-full mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Recent AI Tasks
        </h2>
        {recentTasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No recent tasks yet. Generate one in your dashboard!</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {recentTasks.map((task) => (
              <div
                key={task._id}
                className="p-5 rounded-lg shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-200"
              >
                <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Prompt:</p>
                <p className="text-gray-500 dark:text-gray-400 mb-2">{task.prompt}</p>
                <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Result:</p>
                <p className="text-gray-500 dark:text-gray-400">{task.result}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer / Info */}
      <div className="text-center max-w-2xl text-gray-600 dark:text-gray-300">
        <p>This is your personal AI-powered task manager. Your data is private and securely stored.</p>
      </div>
    </div>
  );
};

export default Home;
