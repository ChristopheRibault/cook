export default class Database {
  /**
   * Insert data in choosen collection
   * @static
   * @async
   * @param {string} collection
   * @param {object} data  Must be passed through object connector validator
   * @returns {object} Inserted data
   */
  static async set() { throw new Error('set method is missing'); }

  /**
   * Insert data in choosen collection
   * @static
   * @async
   * @param {string} collection
   * @param {object[]} data
   * @returns {object[]} inserted data
   */
  static async setAll() { throw new Error('setAll method is missing'); }

  /**
   * Delete item with identifier in collection
   * @static
   * @async
   * @param {string} collection
   * @param {string} identifier
   * @returns {object} the deleted item
   */
  static async delete() { throw new Error('delete method is missing'); }

  /**
   * Delete all items in collection
   * @static
   * @async
   * @param {string} collection
   * @param {object} [queryFilters] request query options
   * @returns {object[]} array of deleted items
   */
  static async deleteAll() { throw new Error('deleteAll method is missing'); }

  /**
   * Find and return an item in collection corresponding to filters
   * @static
   * @async
   * @param {string} collection name of the table
   * @param {object} [queryFilters] request query options
   * @returns {object} corresponding item
   */
  static async find() { throw new Error('find method is missing'); }
}
