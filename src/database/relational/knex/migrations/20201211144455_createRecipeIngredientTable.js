exports.up = function(knex) {
  return knex.schema.createTable('recipeIngredient', t => {
    t.collate('utf8_unicode_ci');
    t.string('uuid', 36).unique().notNullable();
    t.string('recipe_uuid', 36).notNullable();
    t.string('ingredient_uuid', 36).notNullable();
    t.text('complement');
    t.integer('quantity');
    t.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('recipeIngredient');
};
