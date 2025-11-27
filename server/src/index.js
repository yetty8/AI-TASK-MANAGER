import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import OpenAI from "openai";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// --------------------
// MongoDB Connection
// --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --------------------
// Task Model
// --------------------
const taskSchema = new mongoose.Schema({
  prompt: String,
  result: String,
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

// --------------------
// OpenAI Setup
// --------------------
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --------------------
// Generate AI Task
// --------------------
app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ output: "Prompt is required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an AI task generator." },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
    });

    const generatedTask = completion.choices[0].message.content.trim();

    // Save to MongoDB
    const newTask = new Task({ prompt, result: generatedTask });
    await newTask.save();

    res.json({ output: generatedTask });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ output: "Failed to generate task." });
  }
});

// --------------------
// Get All Tasks
// --------------------
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
});

// --------------------
// Update Task
// --------------------
app.put("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { prompt, result } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid task ID." });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { prompt, result },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ error: "Task not found." });
    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update task." });
  }
});

// --------------------
// Delete Task
// --------------------
app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Attempting to delete task ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid task ID." });
  }

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      console.log("Task not found:", id);
      return res.status(404).json({ error: "Task not found." });
    }

    console.log("Deleted task:", id);
    res.json({ message: "Task deleted successfully." });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Failed to delete task." });
  }
});

// --------------------
// Start Server
// --------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
