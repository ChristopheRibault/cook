import Joi from 'joi';
import createError from 'http-errors';

export default ((req) => {
  const recipe = Joi.object({
    uuid: Joi.string()
      .guid(),

    title: Joi.string()
      .min(2)
      .max(50)
      .trim()
      .required(),

    ingredients: Joi.array()
      .items(
        Joi.object({
          name: Joi.string()
            .min(2)
            .max(255)
            .trim()
            .required(),
          complement: Joi.string(),
          quantity: Joi.number().allow(''),
        }),
      ),

    instructions: Joi.array()
      .items(Joi.string().trim()),

    creator_uuid: Joi.string()
      .guid(),

  });

  const valid = Joi.alternatives().try(recipe, Joi.array().items(recipe))
    .validate(req.body);

  if (valid.error) throw createError(400, valid.error);

  return valid;
});
