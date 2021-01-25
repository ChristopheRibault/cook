export default [
  {
    method: 'POST',
    path: '/auth/register',
    validators: [validators.Auth.validateCreateParameters],
    handler: controllers.Auth.register,
  },
  {
    method: 'POST',
    path: '/auth/subscribe',
    validators: [validators.Users],
    handler: controllers.Auth.subscribe,
  },
];
