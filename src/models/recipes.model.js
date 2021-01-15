import GenericModel from './generic.model';

export default class RecipesModel extends GenericModel('recipes') {
  static async search(q) {
    return this.Relational.db('recipes')
      .where('title', 'like', `%${q}%`)
      .limit(10)
      .select('*');
  }
}
