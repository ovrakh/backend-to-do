const BaseController = require('./base-controller');
const errorService = require('../services/error-service');

const List = require('../models/list');
const Task = require('../models/task');

class CompanyController extends BaseController {
  constructor() {
    super();
  }

  async getAll(req, res, next) {
    try {
      const skip = +req.query.skip || 0;
      const limit = +req.query.limit || 100;

      req.dataOut = await List
        .find()
        .skip(skip)
        .limit(limit)
        .exec();

      next();
    } catch(error) {
      next(error)
    }
  }
  
  async addList(req, res, next) {
    try {
      req.checkBody('name').notEmpty();

      await this.getValidationResult(req);

      let name = req.body.name;
      let list = await List.findOne({name});
      
      if (list) {
        throw { code : 403, message : 'List already exist' };
      }

      let code = name;

      if (/\s/g.test(name)) {
        code = name
          .split(/\s/)
          .reduce((result, item) => {
            const firstChar = item
              .charAt(0)
              .toUpperCase();

            return result + firstChar + item.substr(1);
          }, '');
      }

      code += Math.round(Date.now() / 1000) % 1000000;
      
      req.dataOut =  await new List({name, code}).save();
      
      next();
    } catch(error) {
      next(error);
    }
  }
  
  async update(req, res, next) {
    try {
      
      req.checkBody('_id').notEmpty();

      await this.getValidationResult(req);

      let listId = req.body._id;
      let listById = await List.findById(listId);

      if (!listById) {
        throw { code : 404, message : 'List not found' };
      }

      let updatedList = {};

      if (req.body.name) {
        let name = req.body.name;

        let listByName = await List.findOne({name});

        if (listByName && listByName._id !== listId) {
          throw { code : 404, message : 'List with this name already busy' };
        }

        updatedList.name = name;
      }

      req.dataOut = await List
        .findOneAndUpdate(
          { _id: listId },
          updatedList,
          { new: true }
        );

      next();
    } catch(error) {
      next({ code: 500, message: error });
    }
  }

  async remove(req, res, next) {
    try {
      console.log('ssss', req.query._id)
      req.checkQuery('_id').notEmpty();

      await this.getValidationResult(req);

      let list = await List.findById(req.query._id);

      if (!list) {
        throw { code : 404, message : 'List not found' };
      }

      req.dataOut = await list.remove();

      next();
    } catch(error) {
      next(error);
    }
  }
}

module.exports = new CompanyController();