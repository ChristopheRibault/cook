exports.up = (knex) => knex.schema.alterTable('users', (t) => {
  t.string('encrypted_password').notNullable().after('email');
});

exports.down = (knex) => knex.schema.alterTable('users', (t) => {
  t.dropColumn(('encrypted_password'));
});
