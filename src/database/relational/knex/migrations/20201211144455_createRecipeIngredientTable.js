exports.up = (knex) => knex.schema.createTable('recipeIngredient', (t) => {
  t.collate('utf8_unicode_ci');
  t.string('uuid', 36).unique().notNullable();
  t.string('recipe_uuid', 36).notNullable();
  t.foreign('recipe_uuid').references('uuid').inTable('recipes').onDelete('CASCADE');
  t.string('ingredient_uuid', 36).notNullable();
  t.text('complement');
  t.integer('quantity');
  t.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable('recipeIngredient');
