exports.up = (knex) => knex.schema
  .createTable('users', (t) => {
    t.string('uuid', 36).notNullable().unique();
    t.string('pseudo').unique();
    t.string('email').unique();
    t.timestamps(true, true);
  });

exports.down = (knex) => knex.schema
  .dropTable('users');
