exports.up = (knex) => knex.schema.alterTable('users', (t) => {
  t.integer('rights').notNullable().after('email');
});

exports.down = (knex) => knex.schema.alterTable('users', (t) => {
  t.dropColumn(('rights'));
});
