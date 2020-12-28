import Uuid from 'uuid/dist/v4';
import knex from 'knex';
import knexfile from './knex/knexfile';
import Generic from '../generic.database';

export default class Relational extends Generic {
  static db = knex(knexfile[process.env.NODE_ENV]);

  /**
   * Insert data in choosen collection
   * @static
   * @async
   * @param {string} collection
   * @param {object} data
   * @returns {object} Inserted data
   */
  static async set(collection, data) {
    data.uuid = data.uuid || Uuid();

    try {
      await this.db(collection)
        .insert(data)
        .onConflict('uuid')
        .merge();

      return data;
    } catch (e) {
      throw new Error(`db connector 'set' failure. ${e.message}`);
    }
  }

  /**
   * Insert data in choosen collection
   * @static
   * @async
   * @param {string} collection
   * @param {object[]} data
   * @returns {object[]} inserted data
   */
  static async setAll(collection, data) {
    // Redirect misuse of setAll
    if (!Array.isArray(data)) return this.set(collection, data);

    try {
      await this.db
        .transaction((trx) => {
          const queries = data
            .map((item) => this.set(collection, item));

          return Promise.all(queries)
            .then(trx.commit)
            .catch(trx.rollback);
        });

      return data;
    } catch (e) {
      throw new Error(`db connector 'setAll' failure. ${e.message}`);
    }
  }

  /**
   * Find one item by uuid
   * @static
   * @async
   * @param {string} collection
   * @param {string} uuid
   * @returns {object}
   */
  static async findOne(collection, uuid) {
    try {
      return this.db(collection)
        .where({ uuid })
        .select()
        .then((res) => res[0]);
    } catch (e) {
      throw new Error(`db connector 'find' failure. ${e.message}`);
    }
  }
}
