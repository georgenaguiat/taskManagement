const TaskController = require('../controllers/taskManager.controllers');

module.exports = app => {
    app.get('/api/task', TaskController.getAllTasks);
    app.post('/api/new/task', TaskController.createNewTask);
    app.get('/api/task/:id', TaskController.getOneTask);
    app.put('/api/task/editTask/:id', TaskController.updateOneTask);
    app.delete('/api/deleteTask/:id', TaskController.deleteOneTask);
}