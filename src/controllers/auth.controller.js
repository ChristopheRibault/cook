import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

import { Dbusers } from '../models';

export default class AuthController {
  /**
   * Create a new user
   * @async
   * @static
   * @param {object} req
   */
  static async subscribe(req) {
    return bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) throw new Error(err.message);
      return Dbusers.createOne({
        pseudo: req.body.pseudo,
        email: req.body.email,
        encrypted_password: hash,
        rights: 10,
      });
    });
  }

  /**
   * Sign a user in
   * @static
   * @async
   * @param {object} req
   * @returns {object} access token
   */
  static async register(req) {
    const user = await Dbusers.getAll({ filters: { email: { eq: req.body.email } } })
      .then((res) => res[0]);

    const match = await bcrypt.compare(req.body.password, user.encrypted_password);

    if (match) {
      const payload = {
        uuid: user.uuid,
        email: user.email,
        pseudo: user.pseudo,
        rights: user.rights,
      };

      return {
        token: jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn: 60 * 60 }),
      };
    }
    throw createError(403);
  }
}
