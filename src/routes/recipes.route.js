export default [
  {
    method: 'POST',
    path: '/recipe',
    validators: [],
    handler: controllers.Recipes.createRecipe,
  },
]