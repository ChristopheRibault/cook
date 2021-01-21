exports.up = (knex) => knex.schema.createTable('recipes', (t) => {
  t.string('uuid', 36).notNullable().unique();
  t.string('title').notNullable();
  t.string('link');
  t.text('instructions');
  t.string('origin');
  t.string('creator_uuid', 36);
  t.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable('recipes');
