import Uuid from 'uuid/dist/v4';
import db from '../knex';

export default (table) => {
  class GenericModel {
    static async createOne(params) {
      return this.createBulk([params]);
    }

    static async createBulk(params) {
      await Promise.map(params, (entry) => Object.assign(entry, { uuid: Uuid() }));

      return db(table)
        .insert(params)
        .then(() => params);
    }

    static async updateOne(uuid, params) {
      return db(table)
        .insert(Object.assign(params, { uuid }))
        .onConflict('uuid')
        .merge()
        .then(() => uuid);
    }

    static async getOne(uuid) {
      return db(table)
        .where({ uuid })
        .then((data) => data[0]);
    }

    static async getAll() {
      return db(table)
        .select();
    }
  }

  return GenericModel;
};
