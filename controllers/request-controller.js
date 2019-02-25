const BaseController = require('../controllers/base-controller');
const errorService = require('../services/error-service');

const Request = require('../models/request');

class RequestController extends BaseController {
  constructor() {
    super();
  }

  async getRequest(req, res, next) {
    try {
      const request = await Request.find({owner: req.user.id});

      if (!request) {
        throw errorService.request.notFound;
      }

      req.dataOut = request;

      next();
    } catch(err) {
      next(errorService.request.default.ex(err));
    }
  }

  async getRequests(req, res, next) {
    try {
      const skip = +req.query.skip || 0;
      const limit = +req.query.limit || 100;

      req.dataOut = await Request
        .find()
        .skip(skip)
        .limit(limit)
        .populate('company')
        .populate('owner')
        .exec();
      
      next();
    } catch(err) {
      next(errorService.request.default.ex(err))
    }
  }

  async addRequest(req, res, next) {
    try {
      req.checkBody('title').notEmpty();
      req.checkBody('phoneNumber').notEmpty();
      req.checkBody('name').notEmpty();

      await this.getValidationResult(req);

      let title = req.body.title.trim();

      let phoneNumber = req.body.phoneNumber.trim();
      if (!req.user.phoneNumber) {
        req.user.phoneNumber = phoneNumber;
        req.user.save();
      }

      let name = req.body.name.trim();
      if (!req.user.name) {
        req.user.name = name;
        req.user.save();
      }

      req.dataOut = await new Request({
        riskGroups: req.user.riskGroups,
        company: req.user.company,
        owner: req.user.id,
        phoneNumber,
        title,
        name
      }).save();

      next();
    } catch(err) {
      next(errorService.request.default.ex(err));
    }
  }

  async updateRequest(req, res, next) {
    try {
      req.checkBody('_id').notEmpty();
      req.checkBody('isFinished').notEmpty();

      await this.getValidationResult(req);

      const requestId = req.body._id;
      const request = await Request.findById(requestId);

      if (!request) {
        throw errorService.request.notFound;
      }

      const updatedRequest = {
        isFinished: req.body.isFinished
      };

      req.dataOut = await Request
        .findOneAndUpdate(
          {_id: requestId},
          updatedRequest,
          {new: true}
        );

      next();
    } catch(err) {
      next(errorService.request.default.ex(err));
    }
  }

  async removeRequest(req, res, next) {
    try {
      req.checkQuery('_id').notEmpty();

      await this.getValidationResult(req);

      let request = await Request.findById(req.query._id);

      if (!request) {
        throw errorService.request.notFound;
      }

      req.dataOut = await request.remove();

      next();
    } catch(err) {
      next(errorService.request.default.ex(err));
    }
  }

}

module.exports = new RequestController();