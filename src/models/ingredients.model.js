import Uuid from 'uuid/dist/v4';
import db from '../knex';

import GenericModel from './generic.model';

export default class IngredientsModel extends GenericModel('ingredients') {
  static async selectOrCreate(ingredients) {
    const toCreate = [];
    await Promise.each(ingredients, async (ingredient) => {
      ingredient.ingredient_uuid = await db('ingredients')
        .where({ name: ingredient.name })
        .select('uuid')
        .then((res) => res[0]?.uuid);

      if (!ingredient.ingredient_uuid) {
        ingredient.ingredient_uuid = Uuid();
        toCreate.push({
          uuid: ingredient.ingredient_uuid,
          name: ingredient.name,
        });
      }

      delete ingredient.name;
    });

    this.createBulk(toCreate);

    return ingredients;
  }
}
