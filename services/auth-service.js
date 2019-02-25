const BaseController = require('../controllers/base-controller');
const errorService = require('./error-service');

const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Session = require('../models/session');

class AuthService extends BaseController {
  constructor() {
    super();
  }
  
  async asUser(req, res, next) {
    try {
      console.log('token', req.headers.authorization);

      req.checkHeaders('Authorization').notEmpty();
      
      await this.getValidationResult(req);

      req.session = await this._getSessionByToken(req.headers.authorization);

      console.log('req.session.owner', req.session.owner)
      
      let user =  await User.findById(req.session.owner);

      if (!user) {
        throw { code : 404, message : 'User not found' };
      }

      req.user = user;
      
      next();
    } catch(error) {
      next(error);
    }
  }

  async asAdmin(req, res, next) {
    try {
      req.checkHeaders('Authorization').notEmpty();

      await this.getValidationResult(req);

      req.session = await this._getSessionByToken(req.headers.authorization);
      let user = await User.findById(req.session.owner);
      
      if (user.role !== 'admin') {
        throw errorService.auth.accessDeny;
      }

      req.user = user;
      next();
    } catch(error) {
      next(errorService.auth.default.ex(error));
    }
  }

  async _getSessionByToken(token) {
    let { sessionID } = await jwt.verify(token, 'TOP_SECRET', (err, res) => {
      if (err) {
        throw { code: 400, message: err};
      }
        return res;
    });
    console.log('sessionID', sessionID)
    let session = await Session.findById(sessionID);

    if (!session) {
      console.log('ooops')
      throw { code : 401, message : 'Session not found' };
    }

    console.log('expD', session.expDate)

    if (session.expDate < Date.now()) {
      console.log('<<<<<')
      session.remove();
      throw { code : 401, message : 'Session invalid' };
    }
console.log('oksession')
    return session;
  }

}

module.exports = new AuthService();