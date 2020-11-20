import { Dbrecipes } from '../models'
import v4 from 'uuid/dist/v4';

export default class RecipesController {

  static async createRecipe(req) {
    return Dbrecipes.createOne(req.body);
  }

  static async getRecipeByUuid(req) {
    return Dbrecipes.getOne(req.params.uuid);
  }

}
