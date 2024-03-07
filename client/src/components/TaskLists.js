
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import background from './images/image1.jpg';

const TaskLists = () => {
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/task')
            .then(res => {
                setTaskList(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const formatDatetime = datetime => {
        const date = new Date(datetime);
        return date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', month: 'short', day: 'numeric', year: 'numeric', hour12: true });
    };

    const handleCheckboxChange = (taskId) => {
        setTaskList(taskList.map(task => {
            if (task._id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        }));
    };

    const handleDelete = (taskId) => {
        axios.delete(`http://localhost:8000/api/deleteTask/${taskId}`)
            .then(res => {
                setTaskList(prevTasks => prevTasks.filter(task => task._id !== taskId));
            })
            .catch(err => console.log(err));
    };

    return (
        <div
            className="container-fluid p-0"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
            }}
        >
            <div className="container bg-light p-4">
                <h2 className="text-center mb-4">All Tasks</h2>
                <div className="text-center mb-3">
                    <Link to="/task/new" className="btn btn-primary">Add New Task</Link>
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered table-info">
                        <thead>
                            <tr>
                                <th>Check</th>
                                <th>Task Title</th>
                                <th className="text-center">Date and Time</th>
                                <th>Repeat</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taskList.map(task => (
                                <tr key={task._id}>
                                    <td><input type="checkbox" className="form-check-input shadow" onChange={() => handleCheckboxChange(task._id)} checked={task.completed} /></td>
                                    <td style={{ color: task.completed ? '#ccc' : (task.priority === 'high' ? 'red' : (task.priority === 'medium' ? '#edb95e' : 'black')), whiteSpace: 'nowrap' }}>
                                        {task.completed ? <s>{task.title}</s> : task.title}
                                    </td>
                                    <td style={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }} className="text-center">
                                        <span style={{ color: task.completed ? '#ccc' : 'inherit' }}>{task.completed ? <s>{formatDatetime(task.datetime)}</s> : formatDatetime(task.datetime)}</span>
                                    </td>
                                    <td style={{ color: task.completed ? '#ccc' : 'inherit' }}>{task.completed ? <s>{task.repeat}</s> : task.repeat}</td>
                                    <td className="text-center">
                                        <div className="btn-group" role="group">
                                            <Link to={`/task/${task._id}`} className="btn btn-primary btn-sm me-1">Detail</Link>
                                            <Link to={`/task/editTask/${task._id}`} className="btn btn-warning btn-sm me-1">Edit</Link>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task._id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TaskLists;
