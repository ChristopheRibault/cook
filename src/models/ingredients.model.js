import GenericModel from './generic.model';

export default class IngredientsModel extends GenericModel('ingredients') {
  static async selectOrCreate(data) {
    await Promise.each(data, async (item) => {
      // Get uuid of existing ingredients
      item.ingredient_uuid = await this.Relational.db('ingredients')
        .where({ name: item.name })
        .select('uuid')
        .then((res) => res[0]?.uuid);

      // Create new ingredients
      if (!item.ingredient_uuid) {
        item.ingredient_uuid = await this.createOne({
          name: item.name,
        })
          .then((ingr) => ingr.uuid);
      }

      delete item.name;
    });

    return data;
  }
}
