module.exports = {
  apps: [
    {
      name: 'cook-api',
      script: 'src/process.js',
      watch: './src',
      ignore_watch: './src/knex/migrations',
      exec_mode: 'cluster',
      instances: 1,
    }
  ]
}