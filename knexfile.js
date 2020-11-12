module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      database: 'cook',
      user:     'root',
      password: 'root',
    },
    migrations: {
      directory: './db/migrations',
    },
  },


};
