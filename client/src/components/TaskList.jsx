import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks.js";
import TaskCard from "./TaskCard.jsx";
import TaskForm from "./TaskForm.jsx";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleAdd = async (task) => {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
  };

  const handleUpdate = async (id) => {
    const updatedTitle = prompt("Enter new task title:");
    if (!updatedTitle) return;
    const updatedTask = await updateTask(id, { title: updatedTitle });
    setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mt-4">Your Tasks</h2>
      <TaskForm onAdd={handleAdd} />
      <div className="mt-4">
        {tasks.length ? (
          tasks.map((task) => (
            <TaskCard key={task._id} task={task} onUpdate={handleUpdate} onDelete={handleDelete} />
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
}
