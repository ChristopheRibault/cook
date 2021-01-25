import express from 'express';
import Promise from 'bluebird';

import Auth from './auth.route';
import Recipes from './recipes.route';
import Ingredients from './ingredients.route';
import Default from './default.route';

export const routes = [
  ...Auth,
  ...Recipes,
  ...Ingredients,

  ...Default,
];

export const createRouter = (app) => {
  const router = express.Router();

  routes.forEach((r) => {
    router[r.method.toLowerCase()](r.path, (req, res, next) => {
      Promise.each(r.validators, (validator) => validator(req, res))
        .then(() => r.handler(req, res))

        // eslint-disable-next-line consistent-return
        .then((data) => {
          if (!res.headersSent) return res.send(data);
        })
        .catch(next);
    });
  });

  app.use(router);
};
