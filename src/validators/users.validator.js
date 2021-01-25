import Joi from 'joi';
import createError from 'http-errors';

export default ((req) => {
  const user = Joi.object({
    pseudo: Joi.string()
      .required(),

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
});
