import Joi from 'joi';
import createError from 'http-errors';

export default class AuthValidator {
  /**
   * Check if user has admin rights
   * @static
   * @param {Object} req
   */
  static userIsAdmin(req) {
    if (!req.user || !req.user.rights || req.user.rights < 30) throw createError(403);
  }

  /**
   * Check parameters to create new user
   * @static
   * @async
   * @param {object} req
   */
  static async validateCreateParameters(req) {
    const user = Joi.object({
      email: Joi.string()
        .email()
        .required(),

      password: Joi.string()
        .pattern(new RegExp('^(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'))
        .required(),

    });

    const valid = user
      .validate(req.body);

    if (valid.error) throw createError(400, valid.error);
  }
}
