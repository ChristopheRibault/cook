exports.up = function(knex) {
  return knex.schema.createTable('ingredients', t => {
    t.collate('utf8_unicode_ci');
    t.string('uuid', 36).unique().notNullable();
    t.string('name').unique().notNullable();
    t.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ingredients');
};
