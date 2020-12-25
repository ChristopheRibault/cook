module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: '@babel/eslint-parser',
  extends: 'airbnb-base',
  globals: {
    controllers: true,
    validators: true,
    middlwares: true,
  },
  rules: {
    semi: ['error', 'always'],
    'no-param-reassign': ['error', { props: false }],
  },
};
