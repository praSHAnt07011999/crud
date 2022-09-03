import './App.css';
import AddTask from './components/AddTask';
import Header from './components/Header';
import Tasks from './components/Tasks';

import { useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";

function App() {
  // All States
    const [tasks, setTasks] = useState([]); 
    const [showAddTask, setShowAddTask] = useState(false); 

    const addTask = (task) => {
      const id = uuidv4();
      const newTask = { id, ...task }
      setTasks([...tasks, newTask]);
      Swal.fire({
          icon: 'success',
          title: 'Yay...',
          text: 'You have successfully added a new task!'
      })
    }

    const deleteTask = (id) => {
      const deleteTask = tasks.filter((task) => task.id !== id);
      setTasks(deleteTask);
      Swal.fire({
          icon: 'success',
          title: 'Oops...',
          text: 'You have successfully deleted a task!'
      })
  }

  const editTask = (id) => {
    const text = prompt("Task Name");
    const day = prompt("Day and Time");
    const myData = tasks.map(x => {
        if (x.id === id) {
            return {
                ...x,
                text: text,
                day: day,
                id: uuidv4()
            }
        }
        return x;
    })
    Swal.fire({
        icon: 'success',
        title: 'Yay...',
        text: 'You have successfully edited an existing task!'
    })
}

    return (
        <>
          <div className="container">
            {/* App Header */}
            <Header showForm={() => setShowAddTask(!showAddTask)} changeTextAndColor={showAddTask} />
            {/* Revealing the Add Task Form */}
            {showAddTask && <AddTask onSave={addTask} />}
            <h3>Number of Tasks: {tasks.length}</h3>
            {/* Displaying Tasks */}
            {
              tasks.length > 0 ?
                (<Tasks tasks={tasks} onDelete={deleteTask} onEdit={editTask}/>) :
                ('No Task Found!')
            }
          </div>
        </>
    )
}

export default App;
