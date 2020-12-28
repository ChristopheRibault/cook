import Uuid from 'uuid/dist/v4';

import { RecipeService } from '../services';
import { Dbrecipes, Dbingredients, DbrecipeIngredient } from '../models';

export default class RecipesController {
  /**
   * Post recipes
   * @param {Object} req http request
   * @returns {Object[]} inserted data
   */
  static async createRecipes(req) {
    const recipes = Array.isArray(req.body) ? req.body : [req.body];

    await Promise.each(recipes, async (recipe) => {
      recipe.uuid = Uuid();
      recipe.instructions = recipe.instructions.join('\n');

      // Add new ingredients in DB and get uuids of ingredients
      const recipeIngredients = await Dbingredients.selectOrCreate(recipe.ingredients)
        .then((ingredients) => ingredients.map((ingredient) => {
          ingredient.recipe_uuid = recipe.uuid;
          return ingredient;
        }));

      // Insert recipeIngredients in DB
      await DbrecipeIngredient.createBulk(recipeIngredients);

      delete recipe.ingredients;
      recipe.origin = 'api';
    });

    // Insert recipe in DB
    return Dbrecipes.createBulk(recipes);
  }

  /**
   * Get one recipe by uuid
   * @param {Object} req http request
   * @returns {Object} recipe
   */
  static async getRecipeByUuid(req) {
    return Dbrecipes.getOne(req.params.uuid)
      .then((recipes) => RecipeService.populate(recipes));
  }

  /**
   * Update a recipe
   * @param {Object} req http request
   * @returns {Object} recipe
   */
  static async updateRecipe(req) {
    return Dbrecipes.updateOne(req.params.uuid, req.body);
  }

  static async searchRecipes(req) {
    return Dbrecipes.search(req.query.q)
      .then((recipes) => RecipeService.populate(recipes));
  }
}
