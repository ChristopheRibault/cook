import { Relational } from '../database';

export default (collection) => {
  class GenericModel {
    static Relational = Relational;

    static async createOne(params) {
      return this.createBulk([params]);
    }

    static async createBulk(params) {
      return Relational
        .setAll(collection, params);
    }

    static async getOne(uuid) {
      return Relational
        .findOne(collection, uuid);
    }

    static async getAll() {
      return Relational
        .db(collection)
        .select();
    }
  }

  return GenericModel;
};
