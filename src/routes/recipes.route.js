export default [
  {
    method: 'POST',
    path: '/recipes',
    validators: [validators.Recipes],
    handler: controllers.Recipes.createRecipe,
  },
  {
    method: 'GET',
    path: '/recipes/:uuid',
    validators: [],
    handler: controllers.Recipes.getRecipeByUuid,
  },
]