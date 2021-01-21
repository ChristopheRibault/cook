module.exports = {
  extends: 'airbnb-base',

  plugins: [
    "mocha"
  ],

  // specific to tests:
  rules: {
    semi: ['error', 'always'],
    "mocha/no-exclusive-tests": "error",
    "no-unused-expressions": 0,
    "no-console": 0,
  },

  globals: {
    "it": true,
    "after": true,
    "before": true,
    "describe": true,
  },
};
