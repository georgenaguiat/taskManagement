import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskDetail from './components/TaskDetail';
import EditTask from './components/EditTask';
import TaskList from './components/TaskLists';
import TaskAlert from './components/TaskAlert';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [tasks, setTasks] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <TaskAlert tasks={tasks} />
        <Routes>
          <Route element={<TaskList tasks={tasks} />} path='/' default />
          <Route element={<TaskForm setTasks={setTasks} />} path='/task/new' />
          <Route element={<TaskDetail />} path='/task/:id' />
          <Route element={<EditTask setTasks={setTasks} />} path='/task/editTask/:id' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
