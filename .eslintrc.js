module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb-base',
  globals: [
    controllers,
    validators,
    middlwares,
  ],
  rules: {
    semi: ['error', 'always'],
  },
};
