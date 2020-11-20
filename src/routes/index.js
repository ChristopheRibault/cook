import express from 'express';
import Promise from 'bluebird';

import Recipes from './recipes.route';

const routes = [
  ...Recipes,
];

export const createRouter = (app) => {
  const router = express.Router();

  routes.forEach((r) => {
    router[r.method.toLowerCase()](r.path, (req, res, next) => {
      Promise.each(r.validators, validator => validator(req, res))
        .then(() => r.handler(req, res))

        .then(data => {
          if (!res.headersSent) return res.send(data);
        })
        .catch(next);
    });
  });

  app.use(router);
};
