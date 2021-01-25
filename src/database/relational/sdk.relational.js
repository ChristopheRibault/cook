import { v4 as uuidv4 } from 'uuid';
import knex from 'knex';
import knexfile from './knex/knexfile';
import Generic from '../generic.database';
import Filter from './filters.relational';

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
    data.uuid = data.uuid || uuidv4();

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
      return this.db
        .transaction((trx) => {
          const queries = data
            .map((item) => this.set(collection, item));

          return Promise.all(queries)
            .then(trx.commit)
            .catch(trx.rollback);
        });
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

  /**
   * Find items with filters
   * @static
   * @async
   * @param {string} collection
   * @param {object} filters
   * @returns {object[]}
   */
  static async find(collection, filter) {
    const { query, values } = Filter.buildFilters(filter.filters);
    try {
      return this.db(collection)
        .whereRaw(query, values)
        .limit(filter.limit || process.env.MAX_LIMIT)
        .select();
    } catch (e) {
      throw new Error(`db connector 'find' failure. ${e.message}`);
    }
  }

  /**
   * Find many by uuids
   * @static
   * @async
   * @param {string} collection
   * @param {string[]} uuids
   * @returns {object[]}
   */
  static async findByUuids(collection, uuids) {
    try {
      return this.db(collection)
        .whereIn('uuid', uuids)
        .select();
    } catch (e) {
      throw new Error(`db connector 'findByUuids' failure. ${e.message}`);
    }
  }

  /**
   * Delete items with filter
   * @static
   * @async
   * @param {string} collection
   * @param {object} filter
   */
  static async deleteAll(collection, filter) {
    const { query, values } = Filter.buildFilters(filter.filters);
    try {
      return this.db(collection)
        .whereRaw(query, values)
        .del();
    } catch (e) {
      throw new Error(`db connector 'deleteAll' failure. ${e.message}`);
    }
  }
}
