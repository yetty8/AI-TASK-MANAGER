import React from "react";

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center px-4 py-10">
      <div className="max-w-3xl bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          Learn More About AI Task Manager
        </h1>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          AI Task Manager helps you create, organize, and edit tasks using artificial intelligence.
          It generates content, saves tasks to a database, and gives you the tools to stay productive.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          This app is built with:
        </p>

        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
          <li>React (Frontend)</li>
          <li>Node.js + Express (Backend)</li>
          <li>MongoDB (Database)</li>
          <li>OpenAI API (AI generation)</li>
        </ul>

        <p className="text-gray-700 dark:text-gray-300">
          More exciting features are coming soon — stay tuned!
        </p>
      </div>
    </div>
  );
};

export default LearnMore;
