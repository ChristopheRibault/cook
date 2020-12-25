exports.up = function(knex) {
  return knex.schema.createTable('recipes', t => {
    t.collate('utf8_unicode_ci');
    t.string('uuid', 36).notNullable().unique();
    t.string('title').notNullable();
    t.string('link');
    t.text('instructions');
    t.string('origin');
    t.string('creator_uuid', 36);
    t.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('recipes');
};
