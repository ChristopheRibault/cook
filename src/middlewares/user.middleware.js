import jwt from 'jsonwebtoken';

import { Dbusers } from '../models';

export default class UserMiddleware {
  /**
   * Set req.user from token
   * @static
   * @async
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {function} next
   */
  static async getUser(req, res, next) {
    if (!req.headers.authorization) return next();
    const auth = req.headers.authorization;
    const token = auth.startsWith('Bearer ') ? auth.substring(7) : auth;

    await jwt.verify(token, process.env.JWT_PRIVATE_KEY, async (err, decoded) => {
      if (err) return;
      req.user = await Dbusers.getOne(decoded.uuid);
    });
    return next();
  }
}
