exports.up = (knex) => knex.schema.createTable('ingredients', (t) => {
  t.string('uuid', 36).unique().notNullable();
  t.string('name').unique().notNullable();
  t.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable('ingredients');
