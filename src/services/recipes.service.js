import db from '../knex';

export default class RecipeService {
  static async populate(data) {
    const recipes = Array.isArray(data) ? data : [data];

    return Promise.map(recipes, async (recipe) => {
      recipe.instructions = recipe.instructions.split('\n');

      // Get ingredients list
      recipe.ingredients = await db('recipeIngredient')
        .where({ recipe_uuid: recipe.uuid })
        .select('ingredient_uuid as uuid', 'complement', 'quantity');

      // Get ingredients names
      await Promise.each(recipe.ingredients, async (ingredient) => {
        ingredient.name = await db('ingredients')
          .where({ uuid: ingredient.uuid })
          .select('name')
          .then((ingr) => ingr[0].name);
      });

      return recipe;
    });
  }
}
