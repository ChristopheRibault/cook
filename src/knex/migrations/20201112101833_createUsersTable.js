exports.up = function(knex) {
  return knex.schema.createTable('users', t => {
    t.collate('utf8_unicode_ci');
    t.string('uuid', 36).notNullable().unique();
    t.string('pseudo').unique();
    t.string('email').unique();
    t.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
