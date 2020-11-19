import { Dbrecipes } from '../models'

export default class RecipesController {

  static async createRecipe(req) {
    return Dbrecipes.createRecipe(req.body);
  }

}
