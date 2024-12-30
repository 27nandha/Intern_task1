import React, { useState } from 'react';
import CreateTask from './CreateTask';

const Home = () => {
  const [todos, setTodos] = useState([]);

  const addTaskToState = (newTask) => {
    setTodos((prevTodos) => [...prevTodos, newTask]);
  };

  const removeTask = (taskToRemove) => {
    setTodos(todos.filter(task => task !== taskToRemove));
  };

  return (
    <div className="home">
      <h1>Todo List</h1>
      <div>
        <CreateTask addTaskToState={addTaskToState} />
        {todos.length === 0 ? (
          <div className="no-record">
            
          </div>
        ) : (
          todos.map((todo, index) => (
            <div key={index} className="task-item">
              <span>{todo}</span>
              <button
                className="delete"
                onClick={() => removeTask(todo)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
