exports.up = function(knex) {
  return knex.schema.createTable('recipes', t => {
    t.string('uuid', 36).notNullable().unique();
    t.string('title').notNullable();
    t.text('ingredients');
    t.text('instructions');
    t.string('creator_uuid', 36);
    t.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('recipes');
};
