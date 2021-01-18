import { Relational } from '../database';

export default (collection) => {
  class GenericModel {
    static Relational = Relational;

    static async createOne(params) {
      return this.createBulk([params])
        .then((res) => res[0]);
    }

    static async createBulk(params) {
      return Relational
        .setAll(collection, params);
    }

    static async updateOne(uuid, params) {
      return Relational
        .set(collection, Object.assign(params, { uuid }));
    }

    static async getOne(uuid) {
      return Relational
        .findOne(collection, uuid);
    }

    static async getMany(uuids) {
      return Relational
        .findByUuids(collection, uuids);
    }

    static async getAll(filter) {
      return Relational
        .find(collection, filter);
    }

    static async deleteAll(filter) {
      return Relational
        .deleteAll(collection, filter);
    }
  }

  return GenericModel;
};
