import Uuid from 'uuid/dist/v4';
import Generic from '../generic.database';
import db from '../../knex';

export default class Relational extends Generic {
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
      await db(collection)
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
    try {
      await db
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
}
