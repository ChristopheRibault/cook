require('dotenv').config();

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: `${__dirname}/migrations`,
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: `${__dirname}/seeds`,
    },
  },

};