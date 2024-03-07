import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import background from './images/image3.jpg';

const TaskDetail = () => {
    const [task, setTask] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/task/${id}`)
            .then(res => {
                console.log(res.data);
                setTask(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [id]);

    const formatDatetime = datetime => {
        const date = new Date(datetime);
        return date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', month: 'short', day: 'numeric', year: 'numeric', hour12: true });
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
                <h2>Task Detail</h2>
                <div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p><strong>Title:</strong> {task.title}</p>
                        <p><strong>Description:</strong> {task.description}</p>
                        <p><strong>Date and Time:</strong> {formatDatetime(task.datetime)}</p>
                        <p><strong>Repeat:</strong> {task.repeat}</p>
                        <p><strong>Priority:</strong> {task.priority}</p>
                    </div>
                </div>
                <div className="mt-3">
                    <Link to="/" className="btn btn-success me-2">Home</Link>
                    <Link to={`/task/editTask/${id}`} className="btn btn-warning me-2">Edit</Link>
                    <button className="btn btn-danger me-2" onClick={() => {
                        axios.delete(`http://localhost:8000/api/deleteTask/${id}`)
                            .then(res => {
                                console.log("Task deleted successfully");
                                navigate('/');
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default TaskDetail;
