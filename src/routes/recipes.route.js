export default [
  {
    method: 'POST',
    path: '/recipes',
    validators: [validators.Recipes],
    handler: controllers.Recipes.createRecipes,
  },
  {
    method: 'GET',
    path: '/recipes/search',
    validators: [],
    handler: controllers.Recipes.searchRecipes,
  },
  {
    method: 'GET',
    path: '/recipes/:uuid',
    validators: [],
    handler: controllers.Recipes.getRecipeByUuid,
  },
  {
    method: 'PATCH',
    path: '/recipes/:uuid',
    validators: [],
    handler: controllers.Recipes.updateRecipe,
  },
];
