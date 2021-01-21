export default [
  {
    method: 'GET',
    path: '/',
    validators: [],
    handler: controllers.Default.healthCheck,
  },
];
