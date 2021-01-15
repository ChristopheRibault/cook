export default class Filter {
  static operators = {
    eq: '=',
    neq: '!=',
    like: 'like',
    nlike: 'not like',
    in: 'in',
    nin: 'not in',
    lt: '<',
    gt: '>',
    asc: 'asc',
    desc: 'desc',
  };

  /**
   * builds query and value for knex whereRaw method based on query filters
   * @static
   * @param {object} filters
   * @returns {object} query and values
   */
  static buildFilters(filters) {
    let query = '';
    const values = [];
    Object.keys(filters).forEach((property) => {
      Object.keys(filters[property]).forEach((condition) => {
        query += `${property} ${this.operators[condition]} ? and `;
        values.push(filters[property][condition]);
      });
    });
    query = query.slice(0, -5);
    return { query, values };
  }
}
