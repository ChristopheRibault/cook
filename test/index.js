/* eslint-disable no-undef */
const config = require('./config');

const { chai, expect, server } = config;

after(() => {
  server.close();
  console.log('after');
  process.exit(0);
});

describe('Create recipes', () => {
  it('Should create a recipe', () => {
    console.log('test');
  });
});
