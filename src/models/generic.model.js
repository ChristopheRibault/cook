import db from '../knex';

export default function(table) {
  class GenericModel {

    static async createBulk(params) {
      return db(table)
        .insert(params);
    }
  
    static async getOne(uuid) {
      return db(table)
        .where({ uuid });
    }

    static async getAll() {
      return db(table);
    }

  }

  return GenericModel
}

