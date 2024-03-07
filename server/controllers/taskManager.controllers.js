const Task = require('../models/taskManager.models');

module.exports = {
    getAllTasks: (req, res) => {
        Task.find()
            .then(allTasks => {
                res.status(200).json(allTasks);
            })
            .catch(err => {
                res.status(400).json(err)
            })
    },

    createNewTask: (req, res) => {
        Task.create(req.body)
            .then(newTask => {
                res.status(200).json(newTask);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },

    getOneTask: (req, res) => {
        Task.findById({_id: req.params.id})
            .then(oneTask => {
                res.status(200).json(oneTask);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },

    updateOneTask: (req, res) => {
        Task.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
            .then(updateTask => {
            res.status(200).json(updateTask);
        })
            .catch(err => {
            res.status(400).json(err);
        })
    },

    deleteOneTask: (req, res) => {
        Task.findByIdAndDelete({_id: req.params.id})
            .then(deleteTask => {
                res.status(200).json(deleteTask);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    }
}
