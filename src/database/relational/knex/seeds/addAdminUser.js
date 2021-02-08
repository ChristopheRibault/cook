const Uuid = require('uuid');
const bcrypt = require('bcrypt');

const encrypted = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8);

exports.seed = async (knex) => knex('users').insert({
  uuid: Uuid.v4(),
  pseudo: 'admin',
  email: process.env.ADMIN_EMAIL,
  encrypted_password: encrypted,
  rights: 30,
});
