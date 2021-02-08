export default [
  {
    method: 'GET',
    path: '/ingredients',
    validators: [],
    handler: controllers.Ingredients.getIngredients,
  },
];
