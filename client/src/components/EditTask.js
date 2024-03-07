import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import background from './images/image2.jpg';

const EditTask = ({ setTasks }) => {
    const [taskForm, setTaskForm] = useState({
        title: '',
        description: '',
        datetime: new Date().toISOString().substr(0, 16),
        repeat: 'never',
        priority: 'low'
    });

    const [errors, setErrors] = useState({});
    const [showCalendar, setShowCalendar] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/task/${id}`)
            .then(res => {
                setTaskForm({
                    title: res.data.title,
                    description: res.data.description,
                    datetime: res.data.datetime,
                    repeat: res.data.repeat,
                    priority: res.data.priority
                });
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    const changeHandler = (e) => {
        setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/task/editTask/${id}`, taskForm)
            .then(res => {
                console.log(res.data);
                setTaskForm({
                    title: '',
                    description: '',
                    datetime: new Date().toISOString().substr(0, 16),
                    repeat: 'never',
                    priority: 'low'
                });
                navigate('/');
                setTasks(prevTasks => [...prevTasks, res.data]);
            })
            .catch(err => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            });
    };

    const handleDateChange = (value) => {
        setTaskForm({ ...taskForm, datetime: value.toISOString().substr(0, 16) });
        setShowCalendar(false);
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
            <div className="container bg-light p-4 rounded position-relative">
                <button className="btn btn-success position-absolute top-0 start-0 mt-3 me-3" onClick={() => navigate('/')}>Home</button>
                <h2 className="text-center">Edit Task</h2>
                <form onSubmit={onSubmitHandler}>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input type="text" className="form-control" name="title" value={taskForm.title} onChange={changeHandler} />
                                {errors.title && <div className='text-danger'>{errors.title.message}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <input type="text" className="form-control" name="description" value={taskForm.description} onChange={changeHandler} />
                                {errors.description && <div className='text-danger'>{errors.description.message}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Datetime</label>
                                <div className="datetime-container">
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        value={taskForm.datetime}
                                        onChange={(e) => setTaskForm({ ...taskForm, datetime: e.target.value })}
                                    />
                                    {showCalendar && (
                                        <div className="calendar-wrapper">
                                            <Calendar
                                                onChange={handleDateChange}
                                                value={new Date(taskForm.datetime)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Repeat</label>
                                <select className="form-select" name="repeat" value={taskForm.repeat} onChange={changeHandler}>
                                    <option value="never">Never</option>
                                    <option value="hourly">Hourly</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekdays">Weekdays</option>
                                    <option value="weekends">Weekends</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="biweekly">Biweekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Priority</label>
                                <select className="form-select" name="priority" value={taskForm.priority} onChange={changeHandler}>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div className="mb-3 text-center">
                                <button className='btn btn-primary' type="submit">Update Task</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default EditTask;
