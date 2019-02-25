const express = require('express');
const router = express.Router();

const authService = require('../services/auth-service');
const taskCtrl = require('../controllers/task-controller');

router.get('/tasks', taskCtrl.getAll.bind(taskCtrl));

router.get('/task', taskCtrl.getTaskById.bind(taskCtrl));

router.get('/task/list', taskCtrl.getTaskByIdList.bind(taskCtrl));

router.get('/task/remove', taskCtrl.remove.bind(taskCtrl));

router.get('/task/list/update', taskCtrl.updateIdList.bind(taskCtrl))

router.post('/task/add', taskCtrl.addTask.bind(taskCtrl));

router.post('/task/update', taskCtrl.updateTask.bind(taskCtrl));

router.post('/task/stage/update', taskCtrl.updateTaskByStage.bind(taskCtrl));

module.exports = router;