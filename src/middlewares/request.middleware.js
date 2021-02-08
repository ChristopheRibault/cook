export default class RequestMiddleware {
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
