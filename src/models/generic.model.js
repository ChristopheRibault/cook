import { Relational } from '../database';

export default (collection) => {
  class GenericModel {
    static Relational = Relational;

    /**
     * Create one item
     * @static
     * @async
     * @param {object} params
     * @returns {object} created item
     */
    static async createOne(params) {
      return this.createBulk([params])
        .then((res) => res[0]);
    }

    /**
     * Create many items
     * @static
     * @async
     * @param {object[]} params
     * @returns {object[]} created items
     */
    static async createBulk(params) {
      return Relational
        .setAll(collection, params);
    }

    /**
     * Updates one item
     * @static
     * @async
     * @param {string} uuid
     * @param {object} params
     * @returns {object} updated item
     */
    static async updateOne(uuid, params) {
      return Relational
        .set(collection, Object.assign(params, { uuid }));
    }

    /**
     * Get one item by uuid
     * @static
     * @async
     * @param {string} uuid
     * @returns {object}
     */
    static async getOne(uuid) {
      return Relational
        .findOne(collection, uuid);
    }

    /**
     * Get many items by uuid
     * @static
     * @async
     * @param {string[]} uuids
     * @returns {object[]}
     */
    static async getMany(uuids) {
      return Relational
        .findByUuids(collection, uuids);
    }

    /**
     * Get many items by filter
     * @static
     * @async
     * @param {object} filter
     * @returns {object[]}
     */
    static async getAll(filter) {
      return Relational
        .find(collection, filter);
    }

    /**
     * Delete items by filter
     * @static
     * @async
     * @param {object} filter
     */
    static async deleteAll(filter) {
      return Relational
        .deleteAll(collection, filter);
    }
  }

  return GenericModel;
};
