import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function App() {
  // State for the new task input and the list of tasks
  const [newTask, setNewTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/task');
      const jsonData = await response.json();
      setTaskList(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Function to handle form submission and add a new task
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { newTask };
      await fetch('http://localhost:5000/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      setNewTask('');
      fetchTasks(); // After adding the task, fetch updated task list
    } catch (err) {
      console.error(err.message);
    }
  };

  // Function to delete a task
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/task/${id}`, {
        method: 'DELETE',
      });
      fetchTasks(); // After deleting the task, fetch updated task list
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1>To Do List App</h1>
      <form onSubmit={formSubmit}>
        <label>Enter a task: </label>
        <input
          type="text"
          placeholder='type here.....'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {taskList.map((task) => (
          <li key={task.id}>
            {/* Button to delete the task with FontAwesome icon */}
            {task.description}
            <button className='deletebtn' onClick={() => deleteTask(task.id)}>
              <FontAwesomeIcon icon={faTimesCircle} className="fa-lg" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
