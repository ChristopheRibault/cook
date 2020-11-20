import uuid from 'uuid/dist/v4';

export default class RequestMiddleware {

  /**
   * Generate a valid v4 uuid for post requests
   * @static
   * @param {Object} req 
   * @param {Object} res 
   * @param {function} next 
   * @returns {function} function next
   */
  static generateUuid(req, res, next) {
    if (Array.isArray(req.body)) {
      req.body.map(item => item.uuid = uuid());
    }
    else {
      req.body.uuid = uuid();
    }
    
    return next();
  }

};
