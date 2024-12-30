import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import TodoModel from "./models/taskModel.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.post("/add", async (req, res) => {
  try {
    const { task } = req.body; // Extract task from request body
    if (!task) {
      return res.status(400).json({ message: "Task is required" });
    }

    const newTask = new TodoModel({ task }); // Create a new document
    const savedTask = await newTask.save(); // Save to the database

    res.status(201).json(savedTask); // Respond with the saved task
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await TodoModel.find(); // Fetch all tasks from the database
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await TodoModel.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ message: "Task is required" });
    }

    const updatedTask = await TodoModel.findByIdAndUpdate(
      id,
      { task },
      { new: true, runValidators: true } // Return the updated task
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  connectDB();
  console.log(`Running in port ${port}`);
});
