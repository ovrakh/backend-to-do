const BaseController = require('./base-controller');
const errorService = require('../services/error-service');

const List = require('../models/list');
const Task = require('../models/task');

class TaskController extends BaseController {
  constructor() {
    super();
  }

  async getAll(req, res, next) {
    try {
      const skip = +req.query.skip || 0;
      const limit = +req.query.limit || 100;

      req.dataOut = await Task
        .find()
        .skip(skip)
        .limit(limit)
        .exec();

      next();
    } catch(error) {
      next(error)
    }
  }

  async getTaskByIdList(req, res, next) {
    try {
      req.checkQuery('idList').notEmpty();

      await this.getValidationResult(req);
      
      let idList = req.query.idList;
      
      const task = await Task.find({idList});

      if (!task) {
        throw { code : 404, message : 'Task not found' };
      }

      req.dataOut = task;

      next();
    } catch(err) {
      next(err);
    }
  }
  
  async getTaskById(req, res, next) {
    try {

      console.log(req.query.id)
      req.checkQuery('id').notEmpty();

      await this.getValidationResult(req);

      let idTask = req.query.id;

      let task = await Task.findById(idTask);
      
      console.log('task', task)

      if (!task) {
        throw { code : 404, message : 'Task not found' };
      }

      req.dataOut = task;

      next();
    } catch(err) {
      next(err);
    }
  }

  async updateIdList(req, res, next) {
    try {
      req.checkQuery('idTask').notEmpty();
      req.checkQuery('idList').notEmpty();

      await this.getValidationResult(req);

      let taskId = req.query.idTask;
      let taskById = await Task.findById(taskId);
      
      console.log('taskById', taskById)

      if (!taskById) {
        throw { code : 404, message : 'Task not found' };
      }

      let updatedList = {};

        updatedList.idList = req.query.idList;

      req.dataOut = await Task
        .findOneAndUpdate(
          { _id: taskId },
          updatedList,
          { new: true }
        );
      next();
    } catch(error) {
      next(error);
    }
  }

  async addTask(req, res, next) {
    try {
      req.checkBody('idList').notEmpty();
      req.checkBody('task').notEmpty();

      // console.log('addCompany')

      await this.getValidationResult(req);

      let idList = req.body.idList;
      let task = req.body.task;

      req.dataOut =  await new Task({idList, task}).save();

      next();
    } catch(error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      req.checkBody('_id').notEmpty();

      await this.getValidationResult(req);

      let taskId = req.body._id;
      let taskById = await Task.findById(taskId);

      if (!taskById) { 
        throw { code : 404, message : 'Task not found' };
      }

      let updatedList = {};

      if (req.body.task) {
        let task = req.body.task;


        let taskByName = await Task.findOne({task});

        if (taskByName && taskByName._id !== taskId) {
          throw { code : 503, message : 'Task with this name already busy' };
        }

        updatedList.task = task;
      }

      req.dataOut = await Task
        .findOneAndUpdate(
          { _id: taskId },
          updatedList,
          { new: true }
        );

      next();
    } catch(error) {
      next(error);
    }
  }

  async updateTaskByStage(req, res, next) {
    try {
      req.checkBody('_id').notEmpty();

      await this.getValidationResult(req);

      let taskId = req.body._id;
      let taskById = await Task.findById(taskId);

      if (!taskById) {
        throw { code : 404, message : 'Task not found' };
      }

      let updatedList = {};
      
      let stage = req.body.stage;

      updatedList.stage = stage;

      req.dataOut = await Task
        .findOneAndUpdate(
          { _id: taskId },
          updatedList,
          { new: true }
        );

      next();
    } catch(error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      req.checkQuery('_id').notEmpty();

      await this.getValidationResult(req);

      let task = await Task.findById(req.query._id);

      if (!task) {
        throw { code : 404, message : 'Task not found' };
      }

      req.dataOut = await task.remove();

      next();
    } catch(error) {
      next(error);
    }
  }
  
  
  
}

module.exports = new TaskController();
