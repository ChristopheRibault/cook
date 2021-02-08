export default [
  {
    method: 'POST',
    path: '/recipes',
    validators: [validators.Recipes],
    handler: controllers.Recipes.createRecipes,
  },
  {
    method: 'GET',
    path: '/recipes/:uuid',
    validators: [],
    handler: controllers.Recipes.getRecipeByUuid,
  },
  {
    method: 'GET',
    path: '/recipes',
    validators: [],
    handler: controllers.Recipes.getRecipes,
  },
  {
    method: 'PATCH',
    path: '/recipes/:uuid',
    validators: [],
    handler: controllers.Recipes.updateRecipe,
  },
  {
    method: 'DELETE',
    path: '/recipes',
    validators: [validators.Auth.userIsAdmin],
    handler: controllers.Recipes.deleteRecipes,
  },
];
