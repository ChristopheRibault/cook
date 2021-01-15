import Uuid from 'uuid/dist/v4';

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
      req.body.map((item) => Object.assign(item, { uuid: Uuid() }));
    } else {
      req.body.uuid = Uuid();
    }

    return next();
  }

  /**
   * builds req.filtering
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {function} function next
   */
  static makeFilters(req, res, next) {
    req.filter = {
      filters: req.query?.filter,
      limit: req.query?.limit,
      order: req.query?.order,
      pagination: req.query?.pagination,
    };

    return next();
  }
}
