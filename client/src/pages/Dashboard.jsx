import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TaskSkeleton from "../components/TaskSkeleton";
import { useTheme } from "../context/ThemeContext";

const Dashboard = () => {
  const { dark } = useTheme();
  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5002/api";

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${baseURL}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Fetch tasks error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Generate AI task
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${baseURL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.output || "Failed to generate task.");

      setResult(data.output);
      setPrompt("");

      fetchTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Edit task
  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setPrompt(task.prompt);
    setResult(task.result);
  };

  // Update task
  const handleUpdate = async () => {
    if (!prompt.trim() || !result.trim()) return;

    try {
      const res = await fetch(`${baseURL}/tasks/${editingTaskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, result }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update task.");

      setEditingTaskId(null);
      setPrompt("");
      setResult("");

      fetchTasks();
      alert("Task updated successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const res = await fetch(`${baseURL}/tasks/${id}`, { method: "DELETE" });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to delete task.");

      alert("Task deleted successfully!");
      fetchTasks();
    } catch (err) {
      alert(err.message);
    }
  };

  // Search filter
  const filteredTasks = tasks.filter(
    (task) =>
      task.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.result.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={dark ? "min-h-screen bg-gray-900 text-gray-100" : "min-h-screen bg-gray-50 text-gray-900"}>
      {/* Navbar */}
      <nav className={dark ? "bg-gray-800 shadow-md" : "bg-white shadow-md"}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-500">AI Task Manager</h1>

          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-lg px-3 py-1 shadow-sm focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Task Form */}
        <section className={dark ? "p-6 bg-gray-800 rounded-lg shadow-md mb-10" : "p-6 bg-white rounded-lg shadow-md mb-10"}>
          <h2 className="text-2xl font-semibold mb-4">{editingTaskId ? "Edit Task" : "New Task"}</h2>

          <div className="space-y-4">
            <textarea
              className={
                dark
                  ? "w-full bg-gray-700 text-gray-100 border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
                  : "w-full border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              }
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter task description..."
            />

            <textarea
              className={
                dark
                  ? "w-full bg-gray-700 text-gray-100 border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
                  : "w-full border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              }
              rows={3}
              value={result}
              onChange={(e) => setResult(e.target.value)}
              placeholder="AI result…"
            />

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex space-x-3">
              {editingTaskId ? (
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium"
                >
                  Update Task
                </button>
              ) : (
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
                >
                  {loading ? "Generating..." : "Generate Task"}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Saved Tasks */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Saved Tasks</h2>

          {filteredTasks.length === 0 ? (
            <p className="text-gray-500">No tasks found.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTasks.map((task) => (
                <div
                  key={task._id}
                  className={
                    dark
                      ? "p-5 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition"
                      : "p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                  }
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold px-2 py-1 bg-blue-200 text-blue-800 rounded">
                      AI Generated
                    </span>
                    <span className="text-gray-400 text-sm">
                      {new Date(task.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <p className="font-semibold mb-1">
                    <span className="text-gray-500">Prompt:</span> {task.prompt}
                  </p>

                  <p className="mb-4">
                    <span className="text-gray-500">Result:</span> {task.result}
                  </p>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(task)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
