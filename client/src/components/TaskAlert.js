import React, { useEffect } from 'react';

const TaskAlert = ({ tasks }) => {
    useEffect(() => {
        tasks.forEach((task) => {
            const dueTime = new Date(task.datetime).getTime();
            const currentTime = new Date().getTime();
            const timeDifference = dueTime - currentTime;

            if (timeDifference > 0) {
                const timeoutId = setTimeout(() => {
                    alert(`Task "${task.title}" is due now!`);
                }, timeDifference);

                return () => clearTimeout(timeoutId);
            }
        });
    }, [tasks]);

    return null;
};

export default TaskAlert;
