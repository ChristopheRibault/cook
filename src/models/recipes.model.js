import knex from 'knex';
import knexfile from '../knexfile';
const db = knex(knexfile.development);

export default class RecipesModel {

  static async createRecipe(params) {
    return db('recipes')
      .insert(params)
  }

}
