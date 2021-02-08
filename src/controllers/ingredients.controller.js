import { Dbingredients } from '../models';

export default class IngredientsController {
  static async getIngredients(req) {
    return Dbingredients.getAll(req.filter);
  }
}
