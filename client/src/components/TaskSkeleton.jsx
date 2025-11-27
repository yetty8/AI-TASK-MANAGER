import React from "react";
import { motion } from "framer-motion";

const TaskSkeleton = () => (
  <motion.div
    initial={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
    className="p-5 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800"
  >
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3"></div>
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
  </motion.div>
);

export default TaskSkeleton;
