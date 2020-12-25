import db from '../knex';

import GenericModel from './generic.model';

export default class RecipesModel extends GenericModel('recipes') {
  static async search(q) {
    return db('recipes')
      .where('title', 'like', `%${q}%`)
      .limit(10)
      .select('*');
  }
}
