import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateTask = () => {
  const [task, setTask] = useState(""); 
  const [tasks, setTasks] = useState([]); 
  const [editTaskId, setEditTaskId] = useState(null); 
  const [editTaskText, setEditTaskText] = useState(""); 

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/tasks");
      setTasks(response.data); 
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAdd = async () => {
    try {
      if (!task) return alert("Task cannot be empty!");
      const result = await axios.post("http://localhost:3001/add", { task });
      console.log("Task added:", result.data);
      setTask(""); 
      fetchTasks(); 
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete a task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`);
      console.log(`Task with id ${id} deleted`);
      fetchTasks(); 
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const startEdit = (id, text) => {
    setEditTaskId(id); 
    setEditTaskText(text); 
  };
  const handleUpdate = async () => {
    try {
      if (!editTaskText) return alert("Task cannot be empty!");
      await axios.put(`http://localhost:3001/tasks/${editTaskId}`, {
        task: editTaskText,
      });
      console.log(`Task with id ${editTaskId} updated`);
      setEditTaskId(null); // Reset editing state
      setEditTaskText(""); // Clear the edit text
      fetchTasks(); // Refresh the tasks list
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="create_form">
      {/* Add Task Section */}
      <h3>Add Task</h3>
      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>

      {/* Task List Section */}
      <h3>Tasks</h3>
      {tasks.length === 0 ? (
        <div>No tasks available</div>
      ) : (
        tasks.map((todo) => (
          <div key={todo._id} className="task-item">
            {editTaskId === todo._id ? (
              // Editing Mode
              <div>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                />
                <button onClick={handleUpdate}>Update</button>
                <button onClick={() => setEditTaskId(null)}>Cancel</button>
              </div>
            ) : (
              // Display Task
              <div>
                <span>{todo.task}</span>
                <button onClick={() => startEdit(todo._id, todo.task)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CreateTask;
